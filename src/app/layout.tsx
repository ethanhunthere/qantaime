import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { CartDrawer, MobileFloatingCart } from "@/widgets/cart-drawer";
import { EspressoAmbientBlobs } from "@/widgets/ambient-background";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "QANTAIME — Çanta Luksoze Origjinale",
    template: "%s — QANTAIME",
  },
  description:
    "Dyqani ekskluziv i çantave luksoze origjinale. Modele të zgjedhura lëkure, çmime transparente në Euro dhe dërgesë e shpejtë me korrier të siguruar.",
  keywords: [
    "QANTAIME",
    "çanta luksoze",
    "çanta lëkure",
    "dyqan çantash",
    "leather bags",
    "luxury bags",
  ],
  authors: [{ name: "QANTAIME" }],
  openGraph: {
    title: "QANTAIME — Çanta Luksoze Origjinale",
    description:
      "Dyqani ekskluziv i çantave luksoze origjinale me dërgesë të shpejtë me korrier të siguruar.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('atelier_theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
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
      <body className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)] font-sans antialiased relative">
        <Providers>
          <EspressoAmbientBlobs />
          <Header />
          <main className="flex-1 w-full relative z-10">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileFloatingCart />
        </Providers>
      </body>
    </html>
  );
}
