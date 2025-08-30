//import { PokemonCard } from "../page/pokemon-card";
import TypeSelect from "@/components/page/type-select";
import { PokemonTypes } from "@/lib/enums";
import { notFound } from "next/navigation";
import { getPokemonByType } from "@/lib/server-functions";
import { ApiResponse } from "@/lib/types";
import { Suspense } from "react";
import CardList from "@/components/page/card-list";
import Loader from "@/components/page/loader";
import CardGrid from "@/components/page/card-grid";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  let request: Promise<ApiResponse> | undefined = undefined;
  const { page } = await searchParams;

  if (slug && PokemonTypes.find((e) => e.name === slug[0])) {
    const pageNo = Number(page);

    request = !isNaN(pageNo)
      ? getPokemonByType(slug[0], pageNo)
      : getPokemonByType(slug[0]);
  }

  if (slug && !PokemonTypes.find((e) => e.name === slug[0])) return notFound();
  const path = slug?.[0];
  return (
    <main className="content-grid flex flex-col grow">
      <nav className="full-width flex flex-col max-h-20 items-center justify-items-center gap-4">
        <h2 className="text-3xl">Pick your type:</h2>
        <div className="flex gap-4 items-center">
          <TypeSelect slug={path} />
        </div>
      </nav>
      <Suspense fallback={<Loader />}>
        <CardGrid>
          {request && <CardList key={slug?.[0]} request={request} />}
        </CardGrid>
      </Suspense>
    </main>
  );
}
