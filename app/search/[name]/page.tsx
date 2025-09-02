import { CardList } from "@/components/pokemon/card/list/card-list";
import SearchArea from "@/components/pokemon/main/search-area";

import Loader from "@/components/pokemon/ui/loader";
import { runQuery } from "@/lib/server-functions";
import { checkPage } from "@/lib/utils";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const { name } = await params;
  const { page } = await searchParams;
  const filter = checkPage({ name }, page);
  const pokemon = runQuery(filter);

  return (
    pokemon && (
      <>
        <SearchArea value={name} />
        <div className="content-grid flex flex-col grow justify-center items-start gap-2">
          <div className="breakout grow">
            <Suspense key={name} fallback={<Loader text="Searching..." />}>
              <h1 className="text-center text-3xl">
                Results for &quot;{name}&quot;:
              </h1>
              <CardList request={pokemon} />
            </Suspense>
          </div>
        </div>
      </>
    )
  );
}
