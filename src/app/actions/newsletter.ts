"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

async function sendSlackNotification(data: {
  name: string;
  email: string;
  business?: string;
  service?: string;
  message: string;
}) {
  if (!slackWebhookUrl) return; // silently skip if not configured

  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const payload = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🏠 New Inquiry — CNY's Open House",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name:*\n${data.name}` },
          { type: "mrkdwn", text: `*Email:*\n<mailto:${data.email}|${data.email}>` },
          { type: "mrkdwn", text: `*Business:*\n${data.business || "_Not provided_"}` },
          { type: "mrkdwn", text: `*Interested In:*\n${data.service || "_Not specified_"}` },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Their Goals:*\n>${data.message.replace(/\n/g, "\n>")}`,
        },
      },
      { type: "divider" },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `📅 Submitted ${now} ET  •  Source: Landing Page`,
          },
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Reply via Email", emoji: true },
            url: `mailto:${data.email}?subject=Re: Your CNY's Open House Inquiry`,
            style: "primary",
          },
        ],
      },
    ],
  };

  try {
    await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Don't fail the form submission if Slack is down
    console.error("Slack notification error:", err);
  }
}

export type ContactState = {
  success: boolean;
  message: string;
};

// Keep old type alias for any lingering imports
export type NewsletterState = ContactState;

export async function submitContactForm(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const business = formData.get("business")?.toString().trim();
  const service = formData.get("service")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name) return { success: false, message: "Please enter your name." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, message: "Please enter a valid email address." };
  if (!message) return { success: false, message: "Please tell us a bit about your goals." };

  // Always fire Slack first — independent of Supabase
  await sendSlackNotification({
    name: name!,
    email: email!,
    business: business || undefined,
    service: service || undefined,
    message: message!,
  });

  // Attempt Supabase insert — skip gracefully if credentials aren't configured
  const isSupabaseConfigured =
    supabaseUrl && !supabaseUrl.includes("placeholder") &&
    supabaseServiceKey && !supabaseServiceKey.includes("placeholder");

  if (isSupabaseConfigured) {
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const { error } = await supabase.from("contact_inquiries").insert({
        name,
        email,
        business: business || null,
        service: service || null,
        message,
        source: "landing_page",
      });
      if (error) {
        console.error("Supabase insert error:", error);
        // Don't fail — Slack already fired, user gets success
      }
    } catch (err) {
      console.error("Supabase error:", err);
    }
  }

  return {
    success: true,
    message: "We got it! Someone from our team will be in touch within 1 business day.",
  };
}

// Keep old export so nothing breaks if referenced elsewhere
export const subscribeToNewsletter = submitContactForm;
