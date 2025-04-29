import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TransactionBarChart = ({ chartData, chartOptions }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default TransactionBarChart;
