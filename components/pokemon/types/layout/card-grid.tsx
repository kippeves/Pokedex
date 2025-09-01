export default function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center p-4">{children}</div>
  );
}
