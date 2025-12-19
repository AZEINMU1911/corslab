// --- Imports ---

import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

// --- Metadata ---

export const metadata: Metadata = {
  title: "Roxy CosLab | Trusted OEM Partner",
  description: "Manufacturing excellence for your beauty brand.",
};

// --- Main Component ---

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Why: Keep global chrome (nav/footer) here so all routes share a consistent frame. */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
