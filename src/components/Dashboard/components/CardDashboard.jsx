import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import ActionButton from "./ActionButton";
import { Edit, Trash } from "iconoir-react";

const CardDashboard = ({
  imageUrl,
  title,
  children,
  onEdit,
  onDelete,
  showActions = true, // toggle visibility of buttons
  editLabel = "Edit",
  deleteLabel = "Delete",
  customActions, // custom button area (can override default buttons)
}) => {
  return (
    <Card className="shadow-md rounded-md hover:shadow-lg transition duration-300 flex flex-col">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="h-40 w-full object-cover rounded-t-xl"
        />
      )}

      <div className="p-4 flex flex-col flex-grow justify-between min-h-[150px]">
        {title && (
          <Typography variant="h6" color="blue-gray" className="mb-2">
            {title}
          </Typography>
        )}

        <div className="text-sm text-gray-700 flex-grow">{children}</div>

        {customActions ? (
          <div className="mt-auto">{customActions}</div>
        ) : (
          showActions && (
            <div className="flex gap-2 mt-4">
              {onEdit && (
                <ActionButton
                  icon={Edit}
                  label={editLabel}
                  className="text-green-600 bg-gray-100 flex-1"
                  onClick={onEdit}
                />
              )}
              {onDelete && (
                <ActionButton
                  icon={Trash}
                  label={deleteLabel}
                  className="text-red-600 bg-gray-100 flex-1"
                  onClick={onDelete}
                />
              )}
            </div>
          )
        )}
      </div>
    </Card>
  );
};

export default CardDashboard;
