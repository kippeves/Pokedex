import Color from "colorjs.io";

export const colorToLighter = (colorStr: string) => {
  const color = new Color(colorStr);
  color.lch.l = 85;
  return color.toString({ format: "hex" });
};

export const colorToDarker = (colorStr: string) => {
  const color = new Color(colorStr);
  color.lch.l = 35;
  return color.toString({ format: "hex" });
};