import Image from "next/image";
import { typeToColor } from "./utils";
import { useCard } from "@/provider/card-provider";
import { AbilityPokemon } from "@/lib/types";

export default function CardImage({
  side,
  large = false,
  pokemon,
}: {
  large?: boolean;
  pokemon: AbilityPokemon;
  side: "front" | "back";
}) {
  const { mainType, sprites, name } = pokemon;
  const sprite = side === "front" ? sprites.front : sprites.back;
  const size = large ? 50:36;
  return (
    <div
      style={{ borderColor: typeToColor(mainType.name) }}
      className={`flex rounded-full h-${size} drop-shadow-2xl w-${size} border-6 justify-center self-center overflow-hidden`}
    >
      {sprite && (
        <Image
          className="object-contain w-5/6"
          src={sprite}
          width={large ? 500 : 250}
          height={large ? 400 : 200}
          alt={name}
        />
      )}
    </div>
  );
}
