import { Type } from "@/lib/types";
import { Badge } from "../ui/badge";
import { baseBadge, typeToColor } from "./utils";

export default function TypeList({ types }: { types: Type[] }) {
  return (
    <div className="flex gap-2 justify-center">
      {types.map(({ name }, i) => (
        <Badge
          key={i}
          className="rounded-full border-black capitalize"
          style={{
            ...baseBadge,
            backgroundColor: typeToColor(name),
          }}
        >
          {name}
        </Badge>
      ))}
    </div>
  );
}
