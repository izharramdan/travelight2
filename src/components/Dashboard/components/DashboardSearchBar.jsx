import React from "react";
import { Input } from "@material-tailwind/react";
import { Search } from "iconoir-react";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full md:w-72">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-5 w-5 text-gray-500" />
      </div>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 !border !border-gray-300 !rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
