import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col w-60  border rounded rounded-8 shadow-lg justify-center items-center p-4 gap-4">
        <h2 className="text-5xl">Not Found</h2>
        <p>Sidan kunde inte hittas...</p>
        <Link href="/">Gå tillbaka</Link>
      </div>
    </div>
  );
}
