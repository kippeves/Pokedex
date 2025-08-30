import { Spinner } from "../ui/shadcn-io/spinner";

import React from "react";

function Loader({ text }: { text?: string }) {
  return (
    <div className="flex grow justify-center items-center">
      <div className="flex flex-col gap-2">
        {text && <h1 className="text-4xl">{text}</h1>}
        <div className="text-white rounded-full flex justify-center items-center w-40 h-40 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] shadow-lg">
          <Spinner variant={"ring"} size={140} />
        </div>
      </div>
    </div>
  );
}

export default Loader;
