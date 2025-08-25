import Image from "next/image";
import { GetFiveRandom as GetFourRandom } from "@/lib/util";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const data = await GetFourRandom();

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
        <button className="btn-primary">
          <Image src="/Dice.svg" width={25} height={25} alt="Dice" />
          Random Pokémon
        </button>
      </section>
      <section className="full-width h-full items-baseline ">
        <h1 className="font-jaldi text-5xl text-center pt-10">
          Featured Pokemon:
        </h1>
        <div className="flex gap-4">
          {data.map((e) => (
            <PokemonCard key={e.id} pokemon={e} />
          ))}
        </div>
      </section>
    </main>
  );
}

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card className="overflow-hidden min-w-60 p-6 border-6 border-blue-500 rounded-4 gap-4">
      {pokemon.sprites.front_default && (
        <div className="flex rounded-full h-36 w-36 border-6 border-amber-600 justify-center items-center self-center overflow-hidden">
          <Image
            className="object-contain w-5/6"
            src={pokemon.sprites.front_default}
            width={250}
            height={200}
            alt={pokemon.name}
          />
        </div>
      )}
      <CardHeader className="flex flex-col items-center justify-center p-0">
        <Badge className="rounded-full border-black" variant={"outline"}>
          #{pokemon.id}
        </Badge>
        <CardTitle className="capitalize text-3xl font-light"><h2>{pokemon.name}</h2></CardTitle>
        <div className="flex gap-2 justify-center">
        {pokemon.types.map((t) => (
          <Badge
          key={t.slot}
          className="rounded-full border-black capitalize"
          variant={"outline"}
          >
            {t.type.name}
          </Badge>
        ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <PokemonStats stats={pokemon.stats} />
      </CardContent>
    </Card>
  );
}

function PokemonStats({ stats }: { stats: StatElement[] }) {
  const stat = (stat: string) => stats.find((e) => e.stat.name === stat);
  const hp = stat("hp")?.base_stat;
  const attack = stat("attack")?.base_stat;
  const defense = stat("defense")?.base_stat;

  return (
    <ul className="flex flex-col">
      {hp && <Stat name="HP" value={hp} />}
      {attack && <Stat name="Attack" value={attack} />}
      {defense && <Stat name="Defense" value={defense} />}
    </ul>
  );
}

function Stat({ name, value }: { name: string; value: number }) {
  return (
    <li className="flex justify-between font-extrabold ">
      <span>{name}</span>
      <span>{value}</span>
    </li>
  );
}
