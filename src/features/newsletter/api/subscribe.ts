"use server";

import { z } from "zod";
import { ActionState } from "@/shared/types";

const NewsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(100),
});

export async function subscribeNewsletterAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parseResult = NewsletterSchema.safeParse(raw);

  if (!parseResult.success) {
    return {
      success: false,
      message: "Please enter a valid email format.",
    };
  }

  // Simulates secure subscriber registration in private ledger
  return {
    success: true,
    message: "You have been inscribed in the Atelier Private Dispatch.",
  };
}
