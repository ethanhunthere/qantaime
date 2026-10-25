"use server";

import { CheckoutSchema } from "../model/schema";
import { ActionState, OrderConfirmation, CartItem } from "@/shared/types";

export async function submitOrderAction(
  items: CartItem[],
  subtotalEur: number,
  discountEur: number,
  shippingEur: number,
  totalEur: number,
  prevState: ActionState<OrderConfirmation> | null,
  formData: FormData
): Promise<ActionState<OrderConfirmation>> {
  if (!items || items.length === 0) {
    return {
      success: false,
      message: "Cannot checkout with an empty carry. Please select a silhouette first.",
    };
  }

  const raw = Object.fromEntries(formData.entries());
  const parseResult = CheckoutSchema.safeParse(raw);

  if (!parseResult.success) {
    return {
      success: false,
      message: "Please correct the highlighted errors in your delivery information.",
      errors: parseResult.error.flatten().fieldErrors,
    };
  }

  const data = parseResult.data;

  // Generate unique order reference (e.g. AV-2026-8492)
  const orderId = `AV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const deliveryDays = data.shippingMethod === "express" ? 2 : data.shippingMethod === "courier" ? 1 : 4;
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + deliveryDays);

  let stripePaymentDetails: OrderConfirmation["stripePaymentDetails"] = undefined;

  if (data.paymentMethod === "stripe_bank") {
    const cleanIban = (data.stripeBankIban || "").replace(/\s+/g, "");
    const prefix = cleanIban.slice(0, 4).toUpperCase();
    const last4 = cleanIban.slice(-4);
    const maskedIban = `${prefix} •••• •••• •••• ${last4}`;

    stripePaymentDetails = {
      stripePaymentIntentId: `pi_stripe_bank_${Math.random().toString(36).substring(2, 14)}`,
      mandateReference: `STRIPE-MDT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      maskedIban,
      bankName:
        data.country.toLowerCase().includes("franc")
          ? "Banque de France / SEPA Direct Debit"
          : data.country.toLowerCase().includes("ital")
          ? "Intesa Sanpaolo / SEPA Direct Debit"
          : "Stripe Financial Connections",
      status: "authorized",
    };
  }

  const orderConfirmation: OrderConfirmation = {
    orderId,
    dateIso: new Date().toISOString(),
    customer: data,
    items,
    subtotalEur,
    discountEur,
    shippingEur,
    totalEur,
    estimatedDeliveryDate: estimatedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    stripePaymentDetails,
  };

  const successMsg =
    data.paymentMethod === "stripe_bank"
      ? "Commission accepted. Your bank payment has been securely authorized via Stripe."
      : "Your commission has been accepted by the Atelier.";

  return {
    success: true,
    message: successMsg,
    data: orderConfirmation,
  };
}
