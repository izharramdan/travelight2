import React from "react";

const ReusableTable = ({ columns, data, onSort, sortConfig }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full border-collapse bg-white rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-500 text-white">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`border border-black p-4 text-left font-semibold ${
                  column.sortable ? "cursor-pointer hover:bg-blue-600" : ""
                }`}
                onClick={() => column.sortable && onSort(column.key)}
              >
                {column.label}{" "}
                {sortConfig.key === column.key &&
                  (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              {columns.map((column) => (
                <td key={column.key} className="border border-gray-300 p-4">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;