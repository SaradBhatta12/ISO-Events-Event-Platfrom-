import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import SessionWrapper from "./components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "ISO Events",
  description: "Developed by sarad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
