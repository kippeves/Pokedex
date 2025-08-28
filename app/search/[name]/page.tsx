import { PokemonCard } from "@/components/pokemon-card/pokemon-card";
import { getPokemonByName } from "@/lib/server";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemon = await getPokemonByName(name);

  return (
    pokemon && (
      <div className="flex flex-col min-h-screen justify-center items-center gap-2">
        <h1 className="text-3xl">Denna Pokemon hittades:</h1>
        <PokemonCard pokemon={pokemon} />
      </div>
    )
  );
}
