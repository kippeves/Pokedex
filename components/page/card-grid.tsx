import React from "react";

function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="breakout flex flex-col justify-center">{children}</div>;
}

export default CardGrid;
