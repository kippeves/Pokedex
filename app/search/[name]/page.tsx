import SearchArea from "@/components/pokemon/main/search-area";
import { CardList } from "@/components/pokemon/types/layout/card-list";
import Loader from "@/components/pokemon/ui/loader";
import { searchPokemonByName } from "@/lib/server-functions";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemon = searchPokemonByName(name);

  return (
    pokemon && (
      <>
        <SearchArea value={name} />
        <div className="content-grid flex flex-col grow justify-center items-start gap-2">
          <div className="breakout grow">
            <Suspense key={name} fallback={<Loader text="Searching..." />}>
              <h1 className="text-center text-3xl">Results for &quot;{name}&quot;:</h1>
              <CardList request={pokemon} />
            </Suspense>
          </div>
        </div>
      </>
    )
  );
}
