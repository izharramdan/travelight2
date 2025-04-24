import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import ActionButton from "./ActionButton";
import { Edit, Trash } from "iconoir-react";

const CardDashboard = ({ imageUrl, name, onEdit, onDelete }) => {
  return (
    <Card className="shadow-md rounded-xl hover:shadow-lg transition duration-300 flex flex-col">
      {/* Card Header */}
      <img
        src={imageUrl}
        alt={name}
        className="h-40 w-full object-cover rounded-t-xl"
      />
      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow justify-between min-h-[150px]">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <ActionButton
            icon={Edit}
            label="Edit"
            className="text-green-600 bg-green-100 flex-1"
            onClick={onEdit}
          />
          <ActionButton
            icon={Trash}
            label="Delete"
            className="text-red-600 bg-red-100 flex-1"
            onClick={onDelete}
          />
        </div>
      </div>
    </Card>
  );
};

export default CardDashboard;
