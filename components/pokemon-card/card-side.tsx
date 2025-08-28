"use client";
import * as React from "react";
import Styles from "./pokemon-card.module.css";

export function CardSide({
  front,
  children,
}: {
  front: boolean;
  children: React.ReactNode;
}) {
  const cardSide = front ? Styles.flipCardFront : Styles.flipCardBack;
  return <div className={`flex flex-col gap-4 ${cardSide}`}>{children}</div>;
}
