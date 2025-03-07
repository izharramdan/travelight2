import React from "react";
import { IconButton } from "@material-tailwind/react";
import { BrightStar } from "iconoir-react";

const Home = () => {
  return (
    <>
      <div className="item flex flex-wrap justify-center gap-4">
        <IconButton>
          <BrightStar className="h-4 w-4 stroke-2" />
        </IconButton>
      </div>
    </>
  );
};

export default Home;
