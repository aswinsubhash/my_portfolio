"use server";

import {
  contactSchema,
  getContactFieldErrors,
  type ContactResult,
  type ContactValues,
} from "@/lib/contact-form";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/1DBlSf-ggjPkzbLsRR0rZlwyIwxcbXsfgJh6NognhMHg/formResponse";
const ENTRY = {
  name: "entry.1105429070",
  email: "entry.1045630864",
  subject: "entry.846492184",
  message: "entry.591229160",
} as const;

export async function submitContact(
  values: ContactValues,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: getContactFieldErrors(parsed.error),
    };
  }

  const body = new URLSearchParams({
    [ENTRY.name]: parsed.data.name,
    [ENTRY.email]: parsed.data.email,
    [ENTRY.subject]: parsed.data.subject,
    [ENTRY.message]: parsed.data.message,
  });

  const verifyRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY ?? "",
        response: parsed.data.turnstileToken,
      }),
    },
  );
  const verify = (await verifyRes.json()) as { success: boolean };
  if (!verify.success) {
    return { status: "error", message: "CAPTCHA verification failed. Please try again." };
  }

  try {
    await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    return { status: "ok" };
  } catch {
    return {
      status: "error",
      message: "Couldn't send right now. Please try again later.",
    };
  }
}
