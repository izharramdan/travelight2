import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { Search } from "iconoir-react";

const SearchBar = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 mt-[30rem]">
      <div className="relative w-full max-w-2xl p-4 rounded-lg shadow-lg">
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
        <div className="relative z-10 flex items-center space-x-2">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search for destinations"
              className="pl-10 bg-white w-full"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-black" />
            </span>
          </div>
          <Button
            color="lightBlue"
            className="bg-white text-gray-800 h-full"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
