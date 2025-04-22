import React from "react";
import { Input } from "@material-tailwind/react";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="w-full md:w-72">
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg p-2"
      />
    </div>
  );
};

export default SearchBar;
