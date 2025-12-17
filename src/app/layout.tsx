import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google"; // Assuming these are your fonts
import "./globals.css";

import Navbar from "@/components/layouts/Navbar"; // 👈 Import Navbar
import Footer from "@/components/layouts/Footer"; // 👈 Import Footer

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Roxy CosLab | Trusted OEM Partner",
  description: "Manufacturing excellence for your beauty brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {/* 1. Navbar goes here (Fixed to top) */}
        <Navbar />

        {/* 2. Main Page Content */}
        {children}

        {/* 3. Footer goes here (Stays at bottom) */}
        <Footer />
      </body>
    </html>
  );
}
