import { cn } from "@/lib/utils";

export default function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("p-0", className)} {...props} />
  );
}
