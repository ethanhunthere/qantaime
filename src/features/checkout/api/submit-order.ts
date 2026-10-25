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
  };

  return {
    success: true,
    message: "Your commission has been accepted by the Atelier.",
    data: orderConfirmation,
  };
}
