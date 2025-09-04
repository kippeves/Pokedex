import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

  const PageEllipsis = () => {
    return (
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
    );
  };

  const createLink = (index: number) => {
    const newIndex = index + 1;
    newParams.set("page", `${newIndex}`);
    return (
      <PaginationItem key={index} className="flex flex-col">
        <PaginationLink
          isActive={currentPageNo === newIndex}
          href={`${path}?${newParams}`}
        >
          {newIndex}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const Links = () => {
    const maxPages = pages ? pages - 1 : 1;
    const current = Number(currentPage ?? "1");
    const createLinksBetwenIndex = (start: number, end: number) => {
      const items = [];

      if (start - 1 > 0)
        items.push([createLink(0), <PageEllipsis key={"back"} />]);

      items.push(
        ...Array.from({ length: end - start }, (i, index) =>
          createLink(start + index)
        )
      );
      if (end + 1 < maxPages) {
        items.push(<PageEllipsis key={"forward"} />, createLink(maxPages));
      }
      return items;
    };
    const links = createLinksBetwenIndex(
      current - 2 > 0 ? current - 2 : 0,
      current + 2 <= maxPages ? current + 2 : maxPages+1
    );

    return links;
  };

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
