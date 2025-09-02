import Image from "next/image";
import { typeToColor } from "./utils";
import { AbilityPokemon } from "@/lib/types";
import { changeLuminosity } from "@/lib/utils";

export default function CardImage({
  side,
  pokemon,
  big,
  filled,
}: {
  pokemon: AbilityPokemon;
  side: "front" | "back";
  big?: boolean;
  filled?: boolean;
}) {
  const { mainType, sprites, name } = pokemon;
  const sprite = side === "front" ? sprites.front : sprites.back;
  const size = big ? 175 : 175;
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: `6px solid ${typeToColor(mainType.name)}`,
        backgroundColor: filled
          ? changeLuminosity(typeToColor(mainType.name),90)
          : "white",
      }}
      className={`flex rounded-full justify-center self-center overflow-hidden p-1`}
    >
      {sprite && (
        <Image
          className="object-contain"
          src={sprite}
          width={size}
          height={size}
          alt={name}
          priority
        />
      )}
    </div>
  );
}
