import { ListStat } from "@/lib/types";
import Stat from "./stat";

export default function StatList({ stats }: { stats: ListStat[] }) {
  return (
    <ul className="flex flex-col">
      {stats.map((e, i) => (
        <Stat key={i} value={e} />
      ))}
    </ul>
  );
}