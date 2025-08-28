import { ListStat } from "@/lib/types";

export default function Stat({ value: stat }: { value: ListStat }) {
  const { name, value } = stat;
  return (
    <li className="flex justify-between font-extrabold ">
      <span className={name === "hp" ? "uppercase" : "capitalize"}>{name.replaceAll('-',' ')}</span>
      <span>{value}</span>
    </li>
  );
}
