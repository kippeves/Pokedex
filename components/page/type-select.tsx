"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import { PokemonTypes as types } from "@/lib/enums";
import { useRouter } from "next/navigation";

function TypeSelect({ slug }: { slug: string }) {
  const { replace } = useRouter();
  const path = "/types";

  function updateType(type: string): void {
    replace(`/types/${type}`);
  }

  return (
    <>
      <label htmlFor="type">Type:</label>
      <Select name="type" value={slug} onValueChange={(e) => updateType(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Pick a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {types.map((type, index) => (
              <SelectItem
                key={index}
                value={type.name}
                className="flex items-center justify-center"
              >
                <Image
                  alt={type.name}
                  width={100}
                  height={20}
                  src={type.spritePath}
                />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default TypeSelect;
