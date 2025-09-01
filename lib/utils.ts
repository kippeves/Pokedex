import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Color from "colorjs.io";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const changeLuminosity = (colorStr: string,value:number) => {
  const color = new Color(colorStr);
  color.lch.l = value;
  return color.toString({ format: "hex" });
};