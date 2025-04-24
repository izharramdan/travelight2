import React from "react";
import { Button, Spinner } from "@material-tailwind/react";

const ActionButton = ({
  onClick,
  icon: Icon,
  label,
  color = "secondary",
  className = "",
  loading = false,
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "flex items-center gap-2 text-sm transition-all duration-200 justify-center";
  const hoverClasses = "hover:shadow-md active:scale-[0.98]";

  return (
    <Button
      onClick={onClick}
      color={color}
      disabled={disabled || loading}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {loading ? (
        <Spinner className="h-4 w-4" />
      ) : (
        <>
          {Icon && <Icon className="h-5 w-5" />}
          {label}
        </>
      )}
    </Button>
  );
};

export default ActionButton;
