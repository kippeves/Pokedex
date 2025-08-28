import type { Metadata } from "next";
import { Jaldi, Jersey_10 } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Menu from "@/components/page/navbar";

const jaldi = Jaldi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jaldi",
});

const jersey = Jersey_10({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jersey",
});

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Explore the world of Pokémon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jaldi.variable} ${jersey.variable} antialiased min-h-dvh flex flex-col`}
      >
        <header className="content-grid">
          <nav className=" p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image src={"/Logo.png"} alt={"Logo"} width={50} height={50} />
              <h3 className="text-4xl text-gradient">Pokedex</h3>
            </div>
            <Menu />
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
