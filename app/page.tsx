import Image from "next/image";
import FeaturedList from "../components/page/featured-list";
import { Suspense } from "react";
import SearchArea from "@/components/page/search-area";
import { fetchFiveRandom, getRandom } from "@/lib/server-functions";
import Link from "next/link";
import LoadRandom from "@/components/page/random-pokemon";
import Loader from "@/components/page/loader";

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
          <Suspense>
            {randomPokemon && <LoadRandom task={randomPokemon} />}
          </Suspense>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center py-12 ">
        <SearchArea />
      </section>
      <section className="content-grid full-width grow bg-[#F0F0FC] pt-10 pb-20">
        <h1 className="font-jaldi text-5xl text-center pb-10">
          Featured Pokemon:
        </h1>
        <div className="breakout flex flex-wrap justify-center gap-4">
          <Suspense fallback={<Loader />}>
            <FeaturedList task={task} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
