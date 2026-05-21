import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(200),
  subject: z.string().trim().min(1, "Enter a subject").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Enter at least 10 characters")
    .max(4000, "Keep the message under 4,000 characters"),
  turnstileToken: z.string().min(1, "Complete the CAPTCHA"),
});

export type ContactValues = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactValues;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactResult =
  | { status: "ok" }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors };

export const initialContactValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  turnstileToken: "",
};

const contactFields = new Set<ContactField>([
  "name",
  "email",
  "subject",
  "message",
]);

export function getContactFieldErrors(
  error: z.ZodError<ContactValues>,
): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (
      typeof key === "string" &&
      contactFields.has(key as ContactField) &&
      !fieldErrors[key as ContactField]
    ) {
      fieldErrors[key as ContactField] = issue.message;
    }
  }

  return fieldErrors;
}
