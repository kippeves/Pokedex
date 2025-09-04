import { PokemonTypes } from "@/lib/enums";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/pokemon/ui/loader";
import { Filter, runQuery } from "@/lib/server-functions";
import { CardList } from "@/components/pokemon/card/list/card-list";
import { checkPage } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/pokedex/app-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Page(props: {
  searchParams: Promise<{
    name?: string;
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

  if (queries.name && queries.name.length) {
    filter.name = queries.name;
  }

  if (queries.page && isNaN(Number(queries.page))) {
    const newParams = new URLSearchParams(queries);
    newParams.delete("page");
    redirect("/pokedex?" + newParams);
  }

  if (queries.page) {
    filter = checkPage(filter, queries.page);
  }

  const request = runQuery(filter);

  return (
    <main className="relative content-grid flex flex-col grow">
      <SidebarProvider
        defaultOpen={false}
        className="absolute left-0 h-full min-h-full overflow-hidden breakout w-full"
      >
        <AppSidebar />
        <article className="breakout grow flex flex-col h-full">
          <header className="border border-x-0 border-t-0 border-b-black flex justify-end pb-2 px-4">
            <SidebarTrigger />
          </header>
          <ScrollArea className="grow w-full h-full overflow-auto p-3">
            <Suspense
              key={JSON.stringify(filter)}
              fallback={<Loader text="Searching..." />}
            >
              {<CardList request={request} paginated />}
            </Suspense>
          </ScrollArea>
        </article>
      </SidebarProvider>
    </main>
  );
}
