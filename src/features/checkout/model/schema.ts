import { z } from "zod";

export const CheckoutSchema = z
  .object({
    email: z.string().trim().email("Please enter a valid email address").max(100),
    fullName: z.string().trim().min(3, "Full legal name must be at least 3 characters").max(70),
    addressLine1: z.string().trim().min(5, "Street address must be at least 5 characters").max(100),
    addressLine2: z.string().trim().max(100).optional(),
    city: z.string().trim().min(2, "City name required").max(60),
    postalCode: z.string().trim().min(3, "Postal/ZIP code required").max(20),
    country: z.string().trim().min(2, "Country required").max(60),
    phone: z.string().trim().min(6, "Valid phone number required for courier delivery").max(25),
    shippingMethod: z.enum(["standard", "express", "courier"]),
    paymentMethod: z.enum(["card", "apple_pay", "stripe_bank", "wire"]),
    stripeBankIban: z.string().trim().max(40).optional(),
    stripeBankHolder: z.string().trim().max(70).optional(),
    stripeBankBic: z.string().trim().max(20).optional(),
    stripeBankMandateConsent: z.string().optional(),
    monogramNotes: z.string().trim().max(150).optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "stripe_bank") {
      const cleanIban = (data.stripeBankIban || "").replace(/\s+/g, "");
      if (cleanIban.length < 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid IBAN or Bank Account Number (minimum 12 alphanumeric characters)",
          path: ["stripeBankIban"],
        });
      }
      if (!data.stripeBankHolder || data.stripeBankHolder.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Account holder legal name is required for Stripe bank settlement",
          path: ["stripeBankHolder"],
        });
      }
    }
  });

export type CheckoutFormValues = z.infer<typeof CheckoutSchema>;
