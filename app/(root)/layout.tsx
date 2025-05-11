import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProgressBarProvider from "@/components/ProgressBarProvider";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/Provider";
import { getSession } from "@/db/auth";
import { Toaster } from "@/components/ui/toaster";
import ProductChatbot from "@/components/ProductChatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cartoops is a ecommerce platform for buying and selling products",
  description:
    "Cartoops is a ecommerce platform for buying and selling products",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <Providers session={session}>
      <ProgressBarProvider>
        <body className={inter.className}>
          <Header />
          {children}
          <Toaster />
          <Footer />
      <ProductChatbot />
        </body>
      </ProgressBarProvider>
      </Providers>
    </html>
  );
}
