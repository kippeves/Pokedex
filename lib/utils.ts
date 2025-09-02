import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Color from "colorjs.io";
import { Filter } from "./server-functions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const changeLuminosity = (colorStr: string, value: number) => {
  const color = new Color(colorStr);
  color.lch.l = value;
  return color.toString({ format: "hex" });
};

export const checkPage = (filter: Filter, page?: string) => {
  if (page && page?.length) {
    const parsed = Number(page);
    if (!isNaN(parsed)) {
      filter.page = parsed;
    } else filter.page = 1
  }
  return filter;
}