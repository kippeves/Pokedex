"use client";
import { PokemonCard } from "@/components/pokemon/card/single/pokemon-card";
import { ApiResponse } from "@/lib/types";
import React, { use } from "react";
import ListPagination from "../../card/list/list-pagination";
import Styles from "./card-list.module.css";
import CardGrid from "./card-grid";

export function CardList({
  request,
  paginated: pages,
}: {
  paginated?: boolean;
  request: Promise<ApiResponse>;
}) {
  const data = use(request);

  return (
    <CardGrid>
      {pages && <ListPagination pages={data.pages} />}
      <div className={`grid ${Styles.List}`}>
        {data?.pokemon?.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
      {pages && <ListPagination pages={data.pages} />}
    </CardGrid>
  );
}
