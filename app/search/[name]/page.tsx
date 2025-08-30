import CardList from "@/components/page/card-list";
import Loader from "@/components/page/loader";
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
      <div className="content-grid flex flex-col grow justify-center items-center gap-2">
        <h1 className="text-center text-3xl">Dessa Pokemon hittades:</h1>
        <Suspense fallback={<Loader text="Searching..." />}>
          <CardList request={pokemon} />
        </Suspense>
      </div>
    )
  );
}
