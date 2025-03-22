import React from "react";
import useActivity from "./hooks/useActivity";

const ActivitySection = () => {
  const { activities, loading, error } = useActivity();
  return <div>ActivitySection</div>;
};

export default ActivitySection;
