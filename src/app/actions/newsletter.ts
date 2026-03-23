"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export type NewsletterState = {
  success: boolean;
  message: string;
};

export async function subscribeToNewsletter(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = formData.get("email")?.toString().trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    // Use service role key for server-side operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, source: "landing_page" });

    if (error) {
      // Handle duplicate email gracefully
      if (error.code === "23505") {
        return {
          success: true,
          message: "You're already on the list! We'll be in touch.",
        };
      }
      console.error("Supabase error:", error);
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }

    return {
      success: true,
      message: "You're in! Welcome to the CNY Open House community.",
    };
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
