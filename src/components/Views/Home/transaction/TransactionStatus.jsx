import React from "react";
import { Clock, CheckCircle, XmarkCircle } from "iconoir-react";

const TransactionStatus = ({ status }) => {
  const statusStyle = {
    pending: "bg-amber-100 text-amber-800",
    success: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const icon = {
    pending: <Clock className="w-4 h-4" />,
    success: <CheckCircle className="w-4 h-4" />,
    cancelled: <XmarkCircle className="w-4 h-4" />,
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyle[status]}`}
    >
      <span className="flex items-center gap-2">
        {icon[status]}
        {status.toUpperCase()}
      </span>
    </span>
  );
};

export default TransactionStatus;
