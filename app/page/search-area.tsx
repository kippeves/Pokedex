"use client";
import React, { FormEvent, useState } from "react";
import { Input } from "../../components/ui/input";
import { Search } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";

function SearchArea() {
  const [error, setError] = useState<string>();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setError(undefined);
    const p = new FormData(event.currentTarget);
    const name = (p.get("name")?.toString() ?? "").trim();
    if (!name.length) {
      setError("Name can not be empty");
      setTimeout(() => {
        setError(undefined);
      }, 1000);
      return;
    }
    redirect(`/search/${name}`, RedirectType.push);
  }

  return (
    <>
      <form
        className={`border shadow-lg rounded-2xl py-2 px-4 flex justify-between gap-2 focus-within:outline-2 w-3/4 ${
          error && "outline-red-500"
        }`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          className={`text-lg grow outline-0`}
          placeholder="Search for pokemon..."
          required
        />
        <button
          type="submit"
          className="rounded  w-12 flex justify-center items-center text-white bg-[#637cce]"
        >
          <Search />
        </button>
      </form>
      {error && (
        <div className="pt-4 text-destructive">{error?.toString()}</div>
      )}
    </>
  );
}

export default SearchArea;
