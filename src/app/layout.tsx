import type { Metadata } from "next";
import { Open_Sans, Cinzel } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: '--font-open-sans',
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

export const metadata: Metadata = {
  title: "DENIZVIBEZ - AI Creative Suite",
  description: "An elegant, cinematic platform that leverages AI to generate music, video concepts, and imagery. Built by AI, made to feel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full">
      <body className={`${openSans.variable} ${cinzel.variable} font-sans bg-offwhite text-nachtblau flex flex-col h-full`}>
        {children}
      </body>
    </html>
  );
}
