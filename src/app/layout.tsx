import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { CartDrawer } from "@/widgets/cart-drawer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#12100e" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "QANTAIME | Çanta Luksoze Origjinale në Prishtinë, Kosovë",
    template: "%s | QANTAIME",
  },
  description:
    "Dyqani ekskluziv i çantave luksoze origjinale në Prishtinë, Kosovë. Modele të zgjedhura lëkure, çmime transparente në Euro dhe dërgesë e shpejtë me korrier të siguruar në Kosovë, Shqipëri dhe diasporë.",
  keywords: [
    "QANTAIME",
    "çanta luksoze",
    "çanta lëkure",
    "çanta kosovë",
    "dyqan çantash prishtinë",
    "leather bags kosovo",
    "luxury bags prishtina",
  ],
  authors: [{ name: "QANTAIME Kosovë" }],
  openGraph: {
    title: "QANTAIME | Çanta Luksoze Origjinale në Prishtinë, Kosovë",
    description:
      "Dyqani ekskluziv i çantave luksoze origjinale në Prishtinë, Kosovë me dërgesë të shpejtë në Kosovë dhe diasporë.",
    type: "website",
    locale: "sq_XK",
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
