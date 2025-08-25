import type { Metadata } from "next";
import { Jaldi, Jersey_10 } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

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
  type menuItem = {
    name: string;
    path: string;
  };
  const menu: menuItem[] = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Pokedex",
      path: "/pokedex",
    },
    {
      name: "Types",
      path: "/types",
    },
    {
      name: "Favourites",
      path: "/favorites",
    },
  ];
  return (
    <html lang="en">
      <body className={`${jaldi.variable} ${jersey.variable} antialiased`}>
        <header className="content-grid">
          <nav className=" p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image src={"/Logo.png"} alt={"Logo"} width={50} height={50} />
              <h3 className="text-4xl text-gradient">Pokedex</h3>
            </div>
            <ul className="flex gap-4">
              {menu.map((link, i) => (
                <li key={i}>
                  <Link className="text-xl" href={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
