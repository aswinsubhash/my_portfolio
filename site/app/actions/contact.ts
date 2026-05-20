"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  subject: z.string().trim().min(1, "Please enter a subject").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(4000),
});

export type ContactState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/1DBlSf-ggjPkzbLsRR0rZlwyIwxcbXsfgJh6NognhMHg/formResponse";
const ENTRY = {
  name: "entry.1105429070",
  email: "entry.1045630864",
  subject: "entry.846492184",
  message: "entry.591229160",
} as const;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const body = new URLSearchParams({
    [ENTRY.name]: parsed.data.name,
    [ENTRY.email]: parsed.data.email,
    [ENTRY.subject]: parsed.data.subject,
    [ENTRY.message]: parsed.data.message,
  });

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
      message: "Couldn't send right now. Please email me directly.",
    };
  }
}
