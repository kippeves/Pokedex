"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Context = {
  type: string | undefined;
  setType: Dispatch<SetStateAction<string | undefined>>;
};

export const useType = () => useContext(TypeContext)!;

const TypeContext = createContext<Context | undefined>(undefined);

export function TypeProvider({
  value,
  children,
}: {
  value?: string;
  children: React.ReactNode;
}) {
  const [type, setType] = useState<string | undefined>(value);

  return (
    <TypeContext.Provider
      value={{
        type,
        setType,
      }}
    >
      {children}
    </TypeContext.Provider>
  );
}
