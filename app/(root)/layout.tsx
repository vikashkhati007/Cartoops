import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/ProgressBarProvider";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cartoops is a ecommerce platform for buying and selling products",
  description: "Cartoops is a ecommerce platform for buying and selling products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
      <body className={inter.className} suppressHydrationWarning>
        <Header/>
        {children}
        <Footer/>
        </body>
      </Providers>
    </html>
  );
}
