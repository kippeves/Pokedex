import Image from "next/image";
import FeaturedList from "../components/pokemon/main/featured-list";
import { Suspense } from "react";
import SearchArea from "@/components/pokemon/main/search-area";
import { fetchFiveRandom, getRandom } from "@/lib/server-functions";
import Link from "next/link";
import LoadRandom from "@/components/pokemon/main/random-pokemon";
import Loader from "@/components/pokemon/ui/loader";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ random?: string }>;
}) {
  const random = (await searchParams)?.random;
  const randomPokemon = random?.length === 0 && getRandom();

  const task = fetchFiveRandom();
  return (
    <main className="flex flex-col min-h-screen">
      <section className="items-center bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] justify-items-center full-width">
        <h1 className="text-center mt-14 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">
          Gotta catch em all!
        </h1>
        <p className="text-center text-white text-xl">
          Discover, search and explore the amazing world of Pokémon. Find
          <br /> your favourite and learn about their stats.
        </p>
        <div className="pb-10 flex w-full flex-col justify-center items-center">
          <Link href={"/?random"} className="btn-primary">
            <Image src="/Dice.svg" width={25} height={25} alt="Dice" />
            Random Pokémon
          </Link>
          <Suspense fallback={<Loader/>}>
            {randomPokemon && <LoadRandom task={randomPokemon} />}
          </Suspense>
        </div>
      </section>
      <SearchArea />
      <section className="content-grid full-width grow items-start bg-[#F0F0FC] pt-10">
        <h1 className="text-5xl text-center">Featured Pokemon:</h1>
        <div className="breakout">
          <Suspense fallback={<Loader />}>
            <FeaturedList task={task} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
