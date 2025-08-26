import { fetchFiveRandom } from "@/lib/util";
import RandomPokemon from "./page/random-pokemon";
import FeaturedList from "./page/featured-list";
import { Suspense } from "react";
import SearchArea from "@/app/page/search-area";

export default async function Home() {
  const task = fetchFiveRandom();
  return (
    <main className="content-grid min-h-screen">
      <section className="items-center bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] justify-items-center full-width">
        <h1 className="text-center mt-14 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">
          Gotta catch em all!
        </h1>
        <p className="text-center text-white text-xl">
          Discover, search and explore the amazing world of Pokémon. Find
          <br /> your favourite and learn about their stats.
        </p>
        <div className="pb-10">
          <RandomPokemon />
        </div>
      </section>
      <section className="full-width items-center py-12 justify-items-center justify-center">
        <Suspense>
          <SearchArea />
        </Suspense>
      </section>
      <section className="full-width content-center bg-[#F0F0FC] pt-10 pb-20">
        <h1 className="font-jaldi text-5xl text-center pb-10">
          Featured Pokemon:
        </h1>
        <div className="flex gap-4 justify-center">
          <Suspense>
            <FeaturedList task={task} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
