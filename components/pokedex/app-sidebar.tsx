"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { PokemonTypes } from "@/lib/enums";
import { MultiSelect, Option } from "../ui/multi-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const path = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();

  const searchName = params.get("name");
  const paramTypes = params.get("type")?.split(",");
  const typesWithFilter =
    paramTypes && PokemonTypes.filter((pt) => paramTypes.includes(pt.name));

  const types = PokemonTypes.map((t) => ({
    value: t.name,
    label: t.name,
    color: t.color,
  })) as Option[];

  const chosenTypes = types
    ?.filter((p) => typesWithFilter?.find((t) => t.name === p.label))
    .map((i) => i.value);

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      const newParams = new URLSearchParams(params);
      if (value.length) newParams.set("name", value);
      else newParams.delete("name");
      replace(decodeURIComponent(`${path}${newParams && "?" + newParams}`));
    },
    // delay in ms
    1000
  );

  function readChanges(values: string[]): void {
    const newParams = new URLSearchParams(params);
    if (values.length) newParams.set("type", values.join(","));
    else newParams.delete("type");
    replace(decodeURIComponent(`${path}${newParams && "?" + newParams}`));
  }

  return (
    <Sidebar
      side="right"
      variant="inset"
      className="absolute top-[2.8rem] right-0 h-full p-0"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Settings:</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                className="text-sm font-normal text-foreground"
                htmlFor="type"
              >
                Filter by type
              </label>

              <MultiSelect
                id="type"
                options={types}
                defaultValue={chosenTypes}
                placeholder="Choose your types"
                className="w-full"
                onChange={readChanges}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-sm font-normal text-foreground"
              >
                Filter by name
              </label>
              <Input
                type="text"
                id="name"
                placeholder="Search for name..."
                defaultValue={searchName ?? ""}
                onChange={(e) => debounced(e.currentTarget.value)}
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
