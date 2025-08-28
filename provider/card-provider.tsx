"use client";

import { AbilityPokemon } from "@/lib/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Context = {
  pokemon: AbilityPokemon;
  flipped: boolean;
  setFlipped: Dispatch<SetStateAction<boolean>>;
};

export const useCard = () => useContext(CardContext)!;

const CardContext = createContext<Context | undefined>(undefined);

export function CardProvider({
  pokemon,
  children,
}: {
  pokemon: AbilityPokemon;
  children: React.ReactNode;
}) {
  const [flipped, setFlipped] = useState<boolean>(false);

  return (
    <CardContext.Provider
      value={{
        pokemon,
        flipped,
        setFlipped,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}
