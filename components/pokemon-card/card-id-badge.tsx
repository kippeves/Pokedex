import { colorToLighter, colorToDarker } from "@/lib/clientutils";
import { Pokemon } from "@/lib/types";
import { CSSProperties } from "react";
import { Badge } from "../ui/badge";
import { baseBadge, typeToColor } from "./utils";

export default function CardIDBadge({ pokemon }: { pokemon: Pokemon }) {
  const baseColor = typeToColor(pokemon.mainType.name);
  const idBadge: CSSProperties = {
    ...baseBadge,
    backgroundColor: colorToLighter(baseColor),
    color: colorToDarker(baseColor),
    border: `1px solid ${colorToDarker(baseColor)}`,
  };
  return (
    <Badge className="rounded-full" variant={"default"} style={idBadge}>
      #{pokemon.id}
    </Badge>
  );
}
