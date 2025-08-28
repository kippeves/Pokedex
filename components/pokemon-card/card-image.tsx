import Image from "next/image";
import { typeToColor } from "./utils";
import { useCard } from "@/provider/card-provider";

export default function CardImage({ side }: { side: "front" | "back" }) {
  const { pokemon } = useCard();
  const { mainType, sprites, name } = pokemon;
  const sprite = side === "front" ? sprites.front : sprites.back;
  return (
    <div
      style={{ borderColor: typeToColor(mainType.name) }}
      className={`flex rounded-full h-36 w-36 border-6 justify-center items-center self-center overflow-hidden`}
    >
      {sprite && (
        <Image
          className="object-contain w-5/6"
          src={sprite}
          width={250}
          height={200}
          alt={name}
        />
      )}
    </div>
  );
}
