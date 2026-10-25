import { Metadata } from "next";
import { CheckoutView } from "@/views/checkout-view";

export const metadata: Metadata = {
  title: "Commission Settlement & Delivery Manifest",
  description: "Secure white-glove courier settlement for bespoke Atelier Véloce carry commissions.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
