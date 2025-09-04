import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-[#2d2d2d] flex flex-col justify-center items-center h-60 gap-4 text-white">
      <div className="flex gap-4 items-center">
        <Image src={"/Logo.png"} alt="Pokedex" width={50} height={50} />
        <h3 className="text-white text-3xl">Pokédex</h3>
      </div>
      <p>Explore the world of Pokémon</p>
      <div className="flex gap-8">
        <Image
          src={"/Facebook.svg"}
          alt="Facebook Logo"
          width={40}
          height={40}
        />
        <Image
          src={"/Instagram.svg"}
          alt="Instagram Logo"
          width={40}
          height={40}
        />
      </div>
    </footer>
  );
}

export default Footer;
