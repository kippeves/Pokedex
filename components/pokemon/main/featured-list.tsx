"use client";
import React from "react";
import { ApiResponse } from "@/lib/types";
import CardGrid from "../card/list/card-grid";
import { CardList } from "../card/list/card-list";

function FeaturedList({ task }: { task: Promise<ApiResponse> }) {
  return (
    <CardGrid>
      <CardList request={task} />
    </CardGrid>
  );
}

export default FeaturedList;
