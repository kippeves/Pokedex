
import { fetchFiveRandom } from "@/lib/util";
import RandomPokemon from "./(components)/random-pokemon";
import FeaturedList from "./(components)/featured-list";
import { Suspense } from "react";


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
        <RandomPokemon />
      </section>
      <section className="full-width h-full items-baseline ">
        <h1 className="font-jaldi text-5xl text-center pt-10">
          Featured Pokemon:
        </h1>
        <div className="flex gap-4">
          <Suspense fallback={<div>Laddar</div>}>
            <FeaturedList task={task} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
