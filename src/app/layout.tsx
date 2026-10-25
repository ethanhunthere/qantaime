import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { CartDrawer } from "@/widgets/cart-drawer";

export const metadata: Metadata = {
  title: {
    default: "Atelier Véloce — Architectural Leather Goods & Modular Carry",
    template: "%s | Atelier Véloce",
  },
  description:
    "Handcrafted full-grain box calfskin, Tuscan Vachetta, and milled Swiss hardware. Limited editions crafted between Paris and Milan with lifetime restorative service.",
  keywords: [
    "luxury bags",
    "architectural carry",
    "leather briefcase",
    "weekender holdall",
    "vegetable tanned leather",
    "Parisian leathercraft",
  ],
  authors: [{ name: "Atelier Véloce" }],
  openGraph: {
    title: "Atelier Véloce — Architectural Leather Goods",
    description: "Handcrafted full-grain box calfskin and monolithic modular carry.",
    type: "website",
    locale: "en_US",
    siteName: "Atelier Véloce",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] antialiased">
        <Providers>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
