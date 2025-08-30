"use client";
import { PokemonCard } from "@/components/pokemon-card/pokemon-card";
import { ApiResponse } from "@/lib/types";
import React, { use } from "react";
import ListPagination from "./list-pagination";
import CardGrid from "./card-grid";
import Styles from "./card-list.module.css";

function CardList({ request }: { request: Promise<ApiResponse> }) {
  const data = use(request);

  return (
    <CardGrid>
      <ListPagination pages={data.pages} />
      <div className={`grid ${Styles.pokeGrid}`}>
        {data?.pokemon?.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
      <ListPagination pages={data.pages} />
    </CardGrid>
  );
}

export default CardList;
