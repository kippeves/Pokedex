import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

function ListPagination({ pages }: { pages?: number }) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const currentPageNo = currentPage ? Number(currentPage) : 1;
  const newParams = new URLSearchParams(searchParams);

  const getPrevious = () => {
    newParams.set("page", (currentPageNo - 1).toString());
    return `${path}?${newParams.toString()}`;
  };

  const getNext = () => {
    newParams.set("page", (currentPageNo + 1).toString());
    return `${path}?${newParams.toString()}`;
  };

  const createLinks = () => {
    if (!pages) return;
    const links = [];
    for (let i = 0; i < (pages ?? 1); i++) {
      const index = i + 1;
      newParams.set("page", index.toString());
      links.push(
        <PaginationItem key={index}>
          <PaginationLink
            isActive={currentPageNo === index}
            href={`${path}?${newParams}`}
          >
            {index}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return links;
  };
  return (
      <Pagination className="full-width h-20 py-4">
        <PaginationContent>
          {currentPageNo && currentPageNo - 1 > 0 && (
            <PaginationItem>
              <PaginationPrevious href={getPrevious()} />
            </PaginationItem>
          )}
          {createLinks()}
          {pages && currentPageNo && currentPageNo + 1 < pages && (
            <PaginationItem>
              <PaginationNext href={getNext()} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    
  );
}

export default ListPagination;
