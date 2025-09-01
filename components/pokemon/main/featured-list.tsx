"use client";
import React, { use } from "react";
import { ApiResponse } from "@/lib/types";
import CardGrid from "../types/layout/card-grid";
import { CardList } from "../types/layout/card-list";

function FeaturedList({ task }: { task: Promise<ApiResponse> }) {
  return (
    <CardGrid>
      <CardList request={task} />
    </CardGrid>
  );
}

export default FeaturedList;
