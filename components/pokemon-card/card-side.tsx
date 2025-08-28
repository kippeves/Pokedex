import * as React from "react";
import Styles from "./pokemon-card.module.css";
import { Button } from "../ui/button";
import CardImage from "./card-image";
import StatList from "./stat-list";
import Link from "next/link";
import CardHeader from "./card-header";
import CardContent from "./card-content";
import { useCard } from "@/provider/card-provider";

export function CardSide() {
  const { pokemon } = useCard();
  const page1stats = pokemon.stats.filter((s) =>
    ["hp", "attack", "defense"].includes(s.name)
  );
  const page2stats = pokemon.stats.filter((e) => !page1stats.includes(e));

  return (
    <>
      <div className={`flex flex-col gap-4 ${Styles.flipCardFront}`}>
        <CardImage pokemon={pokemon} side="front" />
        <CardHeader />
        <CardContent>
          <StatList stats={page1stats} />
        </CardContent>
        <CardButtons />
      </div>
      <div className={`flex flex-col gap-4 ${Styles.flipCardBack}`}>
        <CardImage pokemon={pokemon} side="back" />
        <CardHeader />
        <CardContent>
          <StatList stats={page2stats} />
        </CardContent>
        <CardButtons />
      </div>
    </>
  );
}

function CardButtons() {
  const { flipped, setFlipped, pokemon } = useCard();

  function flip(): void {
    setFlipped(!flipped);
  }
  return (
    <div className="flex justify-between">
      <Button onClick={() => flip()}>Flip</Button>
      <Button asChild>
        <Link href={`/pokemon/${pokemon.id}`}>Details</Link>
      </Button>
    </div>
  );
}
