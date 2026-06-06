import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DashGarage",
  description: "CRM e inteligencia comercial para concessionarias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
