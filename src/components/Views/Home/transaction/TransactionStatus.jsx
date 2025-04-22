import React from "react";
import {
  Clock,
  CheckCircle,
  XmarkCircle,
  WarningCircle,
} from "iconoir-react";
import { Chip } from "@material-tailwind/react";

const TransactionStatus = ({ status }) => {
  const statusStyle = {
    pending: "bg-amber-100 text-amber-800",
    success: "bg-green-100 text-green-800",
    cancelled: "bg-gray-300 text-gray-800",
    failed: "bg-red-100 text-red-800",
  };

  const icon = {
    pending: <Clock className="w-4 h-4" />,
    success: <CheckCircle className="w-4 h-4" />,
    cancelled: <WarningCircle className="w-4 h-4" />,
    failed: <XmarkCircle className="w-4 h-4" />,
  };

  return (
    <Chip variant="ghost" className={`${statusStyle[status]}`} size="sm" isPill={false}>
      <Chip.Label>
        <span className="flex items-center gap-2">
          {icon[status]}
          {status.toUpperCase()}
        </span>
      </Chip.Label>
    </Chip>
  );
};

export default TransactionStatus;
