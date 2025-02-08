import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Blobs } from "./_components/core/Blob";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "rendi - Calculadora de Rendimientos en Colombia",
  description:
    "Optimiza tus ahorros y descubre cuánto puedes ganar con las mejores tasas de ahorro en Colombia. Calcula tus rendimientos fácil y rápido.",
  keywords: [
    "calculadora de ahorro",
    "rendimientos bancarios",
    "tasas de interés en Colombia",
    "cuentas de ahorro",
    "depósitos a bajo monto",
    "mejor banco para ahorrar",
    "comparar tasas de interés",
    "rendimientos en Colombia",
    "mejores tasas de ahorro",
    "calcular ahorros bancolombia",
    "calcular ahorros davivienda",	
  ],
  robots: "index, follow",
  openGraph: {
    title: "rendi - Calculadora de Rendimientos en Colombia",
    description:
      "Optimiza tus ahorros y descubre cuánto puedes ganar con las mejores tasas de ahorro en Colombia.",
    url: "https://rendi.eddyy.dev/",
    siteName: "rendi",
    images: [
      {
        url: "https://rendi.eddyy.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "rendi - Calculadora de Rendimientos",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "rendi - Calculadora de Rendimientos en Colombia",
    description:
      "Descubre cuánto puedes ganar con las mejores tasas de ahorro en Colombia.",
    images: ["https://rendi.eddyy.dev/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Blobs />
        </ThemeProvider>
      </body>
    </html>
  );
}
