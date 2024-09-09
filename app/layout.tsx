import "./globals.css";
import Footer from "@/components/Fotter";
import { Metadata } from "next";
import NavBar from "@/components/UI/Home/Nav";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Shopify Solana Blinks",
  description: "Shopify Solana Blinks Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
