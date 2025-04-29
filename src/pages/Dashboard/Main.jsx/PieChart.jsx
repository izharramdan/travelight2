// src/components/Charts/PieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionPieChart = ({ data, options }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Pie data={data} options={options} />
    </div>
  );
};

export default TransactionPieChart;
