import "./globals.css";
import Footer from "@/components/Fotter";
import { Metadata } from "next";
import NavBar from "@/components/UI/Home/Nav";
import { Providers } from "./providers";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Shopify Solana Blinks",
  description: "Shopify Solana Blinks Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const url = headers().get("blink-url");
  const showNavbarAndFooter = url?.includes("blink");

  return (
    <html lang="en">
      <body>
        <Providers>
          {!showNavbarAndFooter && <NavBar />}
          {children}
          {!showNavbarAndFooter && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
