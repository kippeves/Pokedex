import {  PokemonTypes } from "@/lib/enums";
import { CSSProperties } from "react";

export const typeToColor = (name: string) =>
  PokemonTypes.find((e) => e.name == name)?.color ?? "white";

export const baseBadge: CSSProperties = {
  fontWeight: "bold",
  borderWidth: 0,
  paddingBlock: 5,
};
