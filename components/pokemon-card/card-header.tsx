import { Pokemon } from "@/lib/types";
import { cn } from "@/lib/utils";
import CardIDBadge from "./card-id-badge";
import TypeList from "./type-list";
import CardTitle from "./card-title";
import { useCard } from "@/provider/card-provider";

export default function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { pokemon } = useCard();
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-6",
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
