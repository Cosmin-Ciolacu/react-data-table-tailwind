import classNames from "classnames";
import { DataTableProps } from "./types";
import { useState } from "react";
import Spinner from "./components/Spinner";

export default function DataTable<T>({
  columns,
  data,
  loading,
  usePagination,
  totalPages,
  onPageChange,
  dark = false,
  containerClassName,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});

  const handleSearchChange = (accessor: string, value: string) => {
    setSearchValues((prev) => ({ ...prev, [accessor]: value }));
    const column = columns.find((col) => col.accessor === accessor);
    if (column && column.onSearch) {
      column.onSearch(accessor as keyof T, value);
    } else {
      const filteredData = data.filter((item) =>
        String(item[accessor as keyof T])
          .toLowerCase()
          .includes(value.toLowerCase())
      );
      setSearchValues((prev) => ({ ...prev, [accessor]: value }));
      if (onPageChange) {
        onPageChange(1); // Reset to first page on search
      }
      // Update the data state with filteredData if needed
      setFilteredData(filteredData);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={classNames(
        containerClassName,
        "mt-8 p-4 rounded-lg shadow-md",
        {
          "bg-gray-800": dark,
          "bg-white": !dark,
        }
      )}
    >
      <div className="w-full" style={{ overflowX: "auto" }}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <table
              className={classNames("w-full divide-y", {
                "divide-gray-700": dark,
                "divide-gray-200": !dark,
              })}
            >
              <thead
                className={classNames("rounded-lg", {
                  "bg-gray-700": dark,
                  "bg-gray-200": !dark,
                })}
              >
                <tr>
                  {columns.map((column) => (
                    <th
                      key={String(column.accessor)}
                      className={classNames(
                        "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider",
                        {
                          "text-gray-300": dark,
                          "text-gray-700": !dark,
                        }
                      )}
                    >
                      <div className="flex flex-col">
                        <span>{column.header}</span>
                        {column.searchable && (
                          <input
                            type="text"
                            placeholder={`Search ${column.header}`}
                            value={searchValues[String(column.accessor)] || ""}
                            onChange={(e) =>
                              handleSearchChange(
                                column.accessor as string,
                                e.target.value
                              )
                            }
                            className={classNames(
                              "mt-2 px-2 py-1 text-sm rounded border",
                              {
                                "bg-gray-900 text-gray-300 border-gray-600":
                                  dark,
                                "bg-gray-100 text-gray-700 border-gray-300":
                                  !dark,
                              }
                            )}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                className={classNames({
                  "bg-gray-800 divide-y divide-gray-700": dark,
                  "bg-white divide-y divide-gray-200": !dark,
                })}
              >
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className={classNames(
                        "px-6 py-4 whitespace-nowrap text-center text-sm",
                        {
                          "text-gray-400": dark,
                          "text-gray-500": !dark,
                        }
                      )}
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      {columns.map((column) => (
                        <td
                          key={column.accessor as string}
                          className={classNames(
                            "px-6 py-4 whitespace-nowrap text-sm",
                            {
                              "text-gray-300": dark,
                              "text-gray-700": !dark,
                            }
                          )}
                        >
                          {column.renderRow
                            ? column.renderRow(item, index)
                            : String(item[column.accessor as keyof T])}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {usePagination && (
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={classNames(
                    "px-4 py-2 rounded disabled:opacity-50",
                    {
                      "bg-gray-600 text-white": dark,
                      "bg-gray-200 text-gray-700": !dark,
                    }
                  )}
                >
                  Previous
                </button>
                <span
                  className={classNames({
                    "text-white": dark,
                    "text-gray-700": !dark,
                  })}
                >
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={classNames(
                    "px-4 py-2 rounded disabled:opacity-50",
                    {
                      "bg-gray-600 text-white": dark,
                      "bg-gray-200 text-gray-700": !dark,
                    }
                  )}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
