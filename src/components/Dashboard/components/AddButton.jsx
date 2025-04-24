import React from "react";
import { Button } from "@material-tailwind/react";
import { Plus } from "iconoir-react";

const AddButton = ({ onClick, className = "", children = "Add", ...props }) => {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center gap-2 ${className}`}
      {...props}
    >
      <Plus className="h-5 w-5" />
      {children}
    </Button>
  );
};

export default AddButton;
