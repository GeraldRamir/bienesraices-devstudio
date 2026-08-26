import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { DemoNavigationGuard } from "@/components/demo/demo-navigation-guard";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { SITE } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "es_DO",
    siteName: SITE.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#f9f9f7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="paper-texture font-sans antialiased">
        <FavoritesProvider>
          {children}
          <DemoNavigationGuard />
        </FavoritesProvider>
      </body>
    </html>
  );
}
