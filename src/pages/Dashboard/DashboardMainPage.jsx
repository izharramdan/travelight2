import React, { useState, useMemo } from "react";
import useAllTransaction from "../../components/Views/Dashboard/hooks/transaction/useAllTransaction";
import TransactionBarChart from "./Main.jsx/BarChart";
import TransactionPieChart from "./Main.jsx/PieChart";

const months = [
  { label: "January", value: 0 },
  { label: "February", value: 1 },
  { label: "March", value: 2 },
  { label: "April", value: 3 },
  { label: "May", value: 4 },
  { label: "June", value: 5 },
  { label: "July", value: 6 },
  { label: "August", value: 7 },
  { label: "September", value: 8 },
  { label: "October", value: 9 },
  { label: "November", value: 10 },
  { label: "December", value: 11 },
];

const getYears = (transactions) => {
  const years = transactions.map((t) => new Date(t.orderDate).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
};

const DashboardMainPage = () => {
  const { data: transactions = [], isLoading } = useAllTransaction();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const availableYears = useMemo(() => getYears(transactions), [transactions]);

  const yearlySummaryData = useMemo(() => {
    const grouped = transactions.reduce((acc, t) => {
      const year = new Date(t.orderDate).getFullYear();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});

    const sortedYears = Object.keys(grouped).sort((a, b) => a - b);

    return {
      labels: sortedYears,
      datasets: [
        {
          label: "Transactions per Year",
          data: sortedYears.map((y) => grouped[y]),
          backgroundColor: "rgba(255, 159, 64, 0.6)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [transactions]);

  const filteredByMonth = useMemo(() => {
    return transactions.filter((t) => {
      const date = new Date(t.orderDate);
      return (
        date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
      );
    });
  }, [transactions, selectedMonth, selectedYear]);

  const filteredByYear = useMemo(() => {
    return transactions.filter((t) => {
      const date = new Date(t.orderDate);
      return date.getFullYear() === selectedYear;
    });
  }, [transactions, selectedYear]);

  const monthChartData = useMemo(() => {
    const grouped = filteredByMonth.reduce((acc, t) => {
      const day = new Date(t.orderDate).getDate();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    const sortedDays = Object.keys(grouped).sort((a, b) => a - b);

    return {
      labels: sortedDays,
      datasets: [
        {
          label: "Transactions per Day",
          data: sortedDays.map((d) => grouped[d]),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [filteredByMonth]);

  const yearChartData = useMemo(() => {
    const grouped = filteredByYear.reduce((acc, t) => {
      const month = new Date(t.orderDate).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const sortedMonths = Object.keys(grouped).sort((a, b) => a - b);

    return {
      labels: sortedMonths.map((m) => months[m]?.label),
      datasets: [
        {
          label: "Transactions per Month",
          data: sortedMonths.map((m) => grouped[m]),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [filteredByYear]);

  const barOptionsMonthly = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      x: { title: { display: true, text: "Date" } }, // Untuk Monthly Transaction (per Day)
      y: {
        title: { display: true, text: "Transactions" },
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  const barOptionsYearly = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      x: { title: { display: true, text: "Month" } }, // Untuk Yearly Transaction (per Month)
      y: {
        title: { display: true, text: "Transactions" },
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  const barOptionsSummary = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      x: { title: { display: true, text: "Year" } }, // Untuk Transaction per Year
      y: {
        title: { display: true, text: "Transactions" },
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  const statusData = useMemo(() => {
    const statusCounts = transactions.reduce((acc, transaction) => {
      const status = transaction.status || "Unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const statusColors = {
      pending: "rgba(255, 193, 7, 0.6)", // Amber
      success: "rgba(40, 167, 69, 0.6)", // Green
      cancelled: "rgba(108, 117, 125, 0.6)", // Gray
      failed: "rgba(220, 53, 69, 0.6)", // Red
      Unknown: "rgba(0, 123, 255, 0.6)", // Blue (default for unknown)
    };

    return {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: Object.keys(statusCounts).map(
            (status) => statusColors[status] || "rgba(0, 123, 255, 0.6)" // Default to blue if status not found
          ),
        },
      ],
    };
  }, [transactions]);

  const pieOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard TraveLight</h1>

      {/* Selectors */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Select Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md p-2"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Select Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md p-2"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Charts */}
      {isLoading ? (
        <p>Loading transactions...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              Monthly Transaction (per Day)
            </h2>
            <TransactionBarChart
              chartData={monthChartData}
              chartOptions={barOptionsMonthly}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              Yearly Transaction (per Month)
            </h2>
            <TransactionBarChart
              chartData={yearChartData}
              chartOptions={barOptionsYearly}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">Transaction per Year</h2>
            <TransactionBarChart
              chartData={yearlySummaryData}
              chartOptions={barOptionsSummary}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">Transaction Status</h2>
            <TransactionPieChart data={statusData} options={pieOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMainPage;
