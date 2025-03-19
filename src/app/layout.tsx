import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const myFont = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PALMS",
  description: "An online learning platform for the Philippine Army",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.className} antialiased`}>{children}</body>
    </html>
  );
}
