import TypeSelect from "@/components/pokemon/main/type-select";
import { PokemonTypes } from "@/lib/enums";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/pokemon/ui/loader";
import { unescape } from "querystring";
import { Filter, runQuery } from "@/lib/server-functions";
import CardGrid from "@/components/pokemon/card/list/card-grid";
import { CardList } from "@/components/pokemon/card/list/card-list";
import { checkPage } from "@/lib/utils";

export default async function Page(props: {
  searchParams: Promise<{
    type?: string;
    page?: string;
  }>;
}) {
  const queries = await props.searchParams;
  const types = queries.type?.split(",");
  const typesWithFilter =
    types && PokemonTypes.filter((pt) => types.includes(pt.name));
  let filter: Filter = {};
  if (typesWithFilter) {
    filter.type = {
      type_ids: typesWithFilter.map((pt) => pt.id),
      exclusive: true,
    };
  }
  if (isNaN(Number(queries.page))) {
    const newParams = new URLSearchParams(queries);
    newParams.delete("page");
    redirect("/pokedex?" + newParams);
  }
  if (queries.page) {
    filter = checkPage(filter, queries.page);
  }

  const request = runQuery(filter ?? {});

  //   const typesVal = dataMap.get("type");
  // const types = typesVal?.split(",");
  // const typesWithFilter = types?.filter((t) =>
  //   PokemonTypes.find((pt) => pt.name === t)
  // );
  // const hasInvalidType =
  //   JSON.stringify(types) !== JSON.stringify(typesWithFilter);

  // const hasEmptyValues = [...dataMap].some(([, value]) => !value.trim().length);

  // if (hasInvalidType || hasEmptyValues) {
  //   const URI = [...dataMap]
  //     .map((entry) => {
  //       if (entry[0] === "type")
  //         return `${entry[0]}=${typesWithFilter?.join(",")}`;
  //       if (entry[1]) return `${entry[0]}=${entry[1]}`;
  //     })
  //     .join("/");
  //   redirect("/pokedex/" + URI);
  // }
  return (
    <main className="content-grid flex flex-col grow">
      <Suspense fallback={<Loader />}>
        <div className="breakout">
          {
            <CardGrid>
              {request && <CardList request={request} paginated />}
            </CardGrid>
          }
        </div>
      </Suspense>
    </main>
  );
}
