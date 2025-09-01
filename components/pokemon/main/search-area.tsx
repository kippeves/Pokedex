"use server";
import React from "react";
import { Search } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";

function SearchArea({ value }: { value?: string }) {
  async function handleSubmit(formdata: FormData) {
    "use server";
    const searchName = formdata.get("name")?.toString();
    if (!searchName || !searchName?.trim()) return;

    redirect(`/search/${searchName}`, RedirectType.push);
  }

  return (
    <section className="flex flex-col justify-center items-center py-12 ">
      <form
        className={`border shadow-lg rounded-2xl py-2 px-4 flex gap-2 focus-within:outline-2 w-2/6`}
        action={handleSubmit}
      >
        <input
          type="text"
          name="name"
          defaultValue={value}
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
    </section>
  );
}

export default SearchArea;
