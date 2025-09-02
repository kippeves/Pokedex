import TypeSelect from "@/components/pokemon/types/layout/type-select";
import { PokemonTypes } from "@/lib/enums";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/pokemon/ui/loader";
import { unescape } from "querystring";

export default async function Page({
  params,
}: {
  params: Promise<{ query: string[] }>;
}) {
  const { query } = await params;
  let dataMap: Map<string, string> | undefined = undefined;

  if (!query) {
    return (
      <main className="content-grid flex flex-col grow">
        <nav className="full-width flex flex-col max-h-20 items-center justify-items-center gap-4">
          <h2 className="text-3xl">Pick your type:</h2>
          <div className="flex gap-4 items-center">
            <TypeSelect slug={query?.[0]} />
          </div>
        </nav>
        <Suspense fallback={<Loader />}>
          <div className="breakout">
            {/* <CardGrid>
              {request && (
                <CardList key={query?.[0]} request={request} paginated />
              )}
            </CardGrid> */}
          </div>
        </Suspense>
      </main>
    );
  }

  if (query) {
    const data = query.map(unescape).map((e) => e.split("="));
    const searchParams = new URLSearchParams(data);
    dataMap = new Map(searchParams);

    const typesVal = dataMap.get("type");
    const types = typesVal?.split(",");
    const typesWithFilter = types?.filter((t) =>
      PokemonTypes.find((pt) => pt.name === t)
    );
    const hasInvalidType =
      JSON.stringify(types) !== JSON.stringify(typesWithFilter);

    const hasEmptyValues = [...dataMap].some(
      ([, value]) => !value.trim().length
    );

    if (hasInvalidType || hasEmptyValues) {
      const URI = [...dataMap]
        .map((entry) => {
          if (entry[0] === "type")
            return `${entry[0]}=${typesWithFilter?.join(",")}`;
          if (entry[1]) return `${entry[0]}=${entry[1]}`;
        })
        .join("/");
      redirect("/pokedex/" + URI);
    }
  }

  return dataMap && <>{JSON.stringify([...dataMap])}</>;
  // pageNo = Number(page);
  // const request = pokemonType
  //   ? !isNaN(pageNo)
  //     ? getPokemonByType([pokemonType?.id], pageNo)
  //     : getPokemonByType([pokemonType?.id])
  //   : undefined;

  return <></>;
}
