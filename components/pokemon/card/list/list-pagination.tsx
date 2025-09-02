import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../ui/pagination";

function ListPagination({ pages }: { pages?: number }) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const currentPageNo = currentPage ? Number(currentPage) : 1;
  const newParams = new URLSearchParams(searchParams);

  const PreviousLink = () => {
    newParams.set("page", (currentPageNo - 1).toString());
    return (
      <PaginationItem>
        <PaginationPrevious href={`${path}?${newParams.toString()}`} />
      </PaginationItem>
    );
  };

  const NextLink = () => {
    newParams.set("page", (currentPageNo + 1).toString());
    return (
      <PaginationItem>
        <PaginationNext href={`${path}?${newParams.toString()}`} />
      </PaginationItem>
    );
  };

  const Links = () =>
    Array.from({ length: pages ?? 1 }).map((_, index) => {
      const newIndex = index + 1;
      newParams.set("page", `${newIndex}`);
      return (
        <PaginationItem key={index}>
          <PaginationLink
            isActive={currentPageNo === newIndex}
            href={`${path}?${newParams}`}
          >
            {newIndex}
          </PaginationLink>
        </PaginationItem>
      );
    });

  return (
    <Pagination className="full-width h-20 py-4">
      <PaginationContent>
        {currentPageNo && currentPageNo - 1 > 0 && <PreviousLink />}
        <Links />
        {pages && currentPageNo + 1 <= pages && <NextLink />}
      </PaginationContent>
    </Pagination>
  );
}

export default ListPagination;
