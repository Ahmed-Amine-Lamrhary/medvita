import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import 'react-datepicker/dist/react-datepicker.css';
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MedVita - Votre partenaire médical",
  description: "Votre partenaire médical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${poppins.variable} antialiased`}
      >
        <Toaster position="bottom-right" richColors expand />

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
