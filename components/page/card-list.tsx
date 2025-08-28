"use client";
import { PokemonCard } from "@/components/pokemon-card/pokemon-card";
import { ApiResponse } from "@/lib/types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { use } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../ui/pagination";
import ListPagination from "./list-pagination";

function CardList({ request }: { request: Promise<ApiResponse> }) {
  const data = use(request);

  return (
    <>
      <ListPagination pages={data.pages} />
      <div className="flex flex-col items-center w-full">
        <div className="container xl:w-3/4 w-full justify-center flex flex-wrap gap-3 grow">
          {data?.pokemon?.map((p, i) => (
            <PokemonCard key={i} pokemon={p} />
          ))}
        </div>
      </div>
      <ListPagination pages={data.pages} />
    </>
  );
}

export default CardList;
