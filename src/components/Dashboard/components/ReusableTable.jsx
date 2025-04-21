import React from "react";

const ReusableTable = ({ columns, data, onSort, sortConfig }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full bg-white overflow-hidden text-sm text-gray-700">
        <thead>
          <tr className="bg-gradient-to-r from-gray-600 to-gray-500 text-white">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`p-4 font-semibold text-left transition-all duration-200 ${
                  column.sortable ? "cursor-pointer hover:bg-gray-500/70" : ""
                }`}
                onClick={() => column.sortable && onSort(column.key)}
              >
                <div className="flex items-center gap-1">
                  {column.label}
                  {sortConfig.key === column.key && (
                    <span>
                      {sortConfig.direction === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`transition-all duration-150 ${
                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-200 hover:shadow-sm`}
            >
              {columns.map((column) => (
                <td key={column.key} className="p-4 border-b border-gray-200">
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
