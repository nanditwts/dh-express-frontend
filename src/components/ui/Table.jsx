import React from "react";
import { clsx } from "clsx";

export function Table({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No data available",
  isLoading = false,
  onRowClick,
  className,
}) {
  const renderCell = (item, column) => {
    if (typeof column.accessor === "function") {
      return column.accessor(item);
    }
    return item[column.accessor];
  };

  return (
    <div className="overflow-x-auto">
      <table className={clsx("min-w-full divide-y divide-gray-200", className)}>
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={clsx(
                  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className={clsx({
                  "hover:bg-gray-50 cursor-pointer": onRowClick,
                })}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={clsx(
                      "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                      column.className
                    )}
                  >
                    {renderCell(item, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
