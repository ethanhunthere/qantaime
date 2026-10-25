import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { CartDrawer } from "@/widgets/cart-drawer";

export const metadata: Metadata = {
  title: {
    default: "QANTAIME — Architectural Leather Goods & Monolithic Carry",
    template: "%s | QANTAIME",
  },
  description:
    "Handcrafted full-grain box calfskin, Tuscan Vachetta, and milled Swiss hardware. Limited editions crafted between Paris and Milan with lifetime restorative service.",
  keywords: [
    "QANTAIME",
    "luxury bags",
    "architectural carry",
    "leather briefcase",
    "weekender holdall",
    "vegetable tanned leather",
    "Swiss luxury leathercraft",
  ],
  authors: [{ name: "QANTAIME" }],
  openGraph: {
    title: "QANTAIME — Architectural Leather Goods",
    description: "Handcrafted full-grain box calfskin and monolithic modular carry.",
    type: "website",
    locale: "sq_AL",
    siteName: "QANTAIME",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500,600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] font-sans antialiased">
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
