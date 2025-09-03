import { PokemonTypes } from "@/lib/enums";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loader from "@/components/pokemon/ui/loader";
import { Filter, runQuery } from "@/lib/server-functions";
import { CardList } from "@/components/pokemon/card/list/card-list";
import { checkPage } from "@/lib/utils";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/pokedex/app-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        className="absolute left-0 h-full min-h-full overflow-hidden breakout w-full rounded-xl"
      >
        <AppSidebar />
        <article className="breakout grow flex flex-col h-[90dvh]">
          <header className="border rounded-t-xl">
            <SidebarTrigger />
          </header>
          <ScrollArea className="grow -mt-2 w-full h-full overflow-y-scroll p-3 border-x border-b rounded-b-xl">
            <Suspense
              key={JSON.stringify(filter)}
              fallback={<Loader text="Searching..." />}
            >
              <CardList request={request} />
            </Suspense>
          </ScrollArea>
        </article>
      </SidebarProvider>
    </main>
  );
}
