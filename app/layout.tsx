import type { Metadata } from "next";
import "./globals.css";

import { UtilityBar } from "@/components/navigation/UtilityBar";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Technology Services",
  description: "Technology services company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UtilityBar />
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}