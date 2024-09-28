import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/Provider";
import { getSession } from "@/db/auth";
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
        <body className={inter.className}>
          <Providers session={session}>
          {children}
          </Providers>
          </body>
    </html>
  );
}
