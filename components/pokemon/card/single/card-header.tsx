import { cn, changeLuminosity } from "@/lib/utils";
import { useCard } from "@/provider/card-provider";
import { Ability, AbilityPokemon, APIPokemon } from "@/lib/types";
import { CSSProperties } from "react";
import { typeToColor, baseBadge } from "./utils";
import { Badge } from "../../../ui/badge";
import TypeList from "./type-list";

export default function CardHeader({
  pokemon,
  className,
  ...props
}: React.ComponentProps<"div"> & { pokemon: AbilityPokemon }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <CardIDBadge pokemon={pokemon} />
      <CardTitle className="capitalize text-xl font-light">
        <h2>{pokemon.name}</h2>
      </CardTitle>
      <TypeList types={pokemon.types} />
    </div>
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardIDBadge({ pokemon }: { pokemon: AbilityPokemon }) {
  const baseColor = typeToColor(pokemon.mainType.name);
  const lightColor = changeLuminosity(baseColor, 85);
  const darkColor = changeLuminosity(baseColor, 35);

  const idBadge: CSSProperties = {
    ...baseBadge,
    backgroundColor: lightColor,
    color: darkColor,
    border: `1px solid ${darkColor}`,
  };
  return (
    <Badge className="rounded-full" variant={"default"} style={idBadge}>
      #{pokemon.pokemon_species_id}
    </Badge>
  );
}
