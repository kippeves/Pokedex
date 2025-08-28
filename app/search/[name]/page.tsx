import CardList from "@/components/page/card-list";
import { searchPokemonByName } from "@/lib/server-functions";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemon = searchPokemonByName(name);

  return (
    pokemon && (
      <div className="flex flex-col grow justify-center items-center gap-2">
        <h1 className="text-3xl">Dessa Pokemon hittades:</h1>
        <CardList request={pokemon} />
      </div>
    )
  );
}
