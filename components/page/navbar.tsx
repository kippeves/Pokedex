"use client";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import Styles from "./navbar.module.css";
function Menu() {
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
  const ref = useRef<HTMLUListElement>(null);

  function showMenu(): void {
    if (!ref.current) return;
    ref.current.classList.toggle(Styles.show);
  }

  return (
    <>
      <ul ref={ref} className={`gap-4 hidden sm:flex ${Styles.menu}`}>
        {menu.map((link, i) => (
          <li key={i}>
            <Link className="text-xl" href={link.path}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <Button
        className={`aspect-square w-auto h-12 flex flex-row sm:hidden justify-center `}
        onClick={() => showMenu()}
      >
        <MenuIcon />
      </Button>
    </>
  );
}

export default Menu;
