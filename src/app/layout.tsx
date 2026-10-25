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
    default: "QANTAIME | Çanta Lëkure të Punuara me Dorë në Kosovë",
    template: "%s | QANTAIME",
  },
  description:
    "Çanta lëkure origjinale të punuara me dorë në Prishtinë, Kosovë. Lëkurë e plotë natyrale, qepje tradicionale me dorë dhe pajisje metalike masive me garanci të përjetshme.",
  keywords: [
    "QANTAIME",
    "çanta lëkure",
    "çanta kosovë",
    "punuar me dorë",
    "prishtinë",
    "leather bags kosovo",
    "handcrafted leather",
  ],
  authors: [{ name: "QANTAIME Kosovë" }],
  openGraph: {
    title: "QANTAIME | Çanta Lëkure të Punuara me Dorë në Kosovë",
    description: "Çanta lëkure origjinale të punuara me dorë në Prishtinë, Kosovë me lëkurë të plotë natyrale dhe qepje tradicionale.",
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
