import React, { useMemo, useState } from "react";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import { ColumnProps } from "@/types";
import GlobalFilter from "./partial/GlobalFilter";
import "./Table.module.scss";
import ModalForm from "../Modal/ModalForm";

interface TableProps {
    TableColumns: ColumnProps[];
    TableData: any[];
    Pagination?: boolean;
    Search?: boolean;
    onClickAdd?: () => void;
    CanImport?: boolean;
}

//disable sorting

const Table: React.FC<TableProps> = ({
    TableColumns,
    TableData,
    Pagination,
    onClickAdd,
    CanImport,
    Search,
}) => {
    const columns = useMemo(() => TableColumns, []);
    const [data, setData] = useState(TableData);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        // useFilter,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        nextPage,
        canNextPage,
        canPreviousPage,
        previousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter,
    } = tableInstance;

    const { pageIndex, pageSize, globalFilter } = state;

    React.useEffect(() => {
        setData(TableData);
    }, [TableData]);

    return (
        <>
            <div className="mb-3 grid grid-cols-2 items-center">
                {Search && (
                    <GlobalFilter
                        filter={globalFilter}
                        setFilter={setGlobalFilter}
                    />
                )}
                <div className="flex col-start-2 justify-end items-center">
                    {
                        onClickAdd && (
                            <div className="px-4 py-2 select-none" onClick={onClickAdd}>Add</div>
                        )
                    }
                    {
                        CanImport && (
                            <div className="border px-4 py-2 ml-5 rounded bg-yellow-500 text-gray-50 select-none cursor-pointer">Import</div>
                        )
                    }
                </div>
            </div>
            <table
                className="border-collapse max-w-7xl w-full"
                {...getTableProps()}
            >
                <thead>
                    {headerGroups.map((headerGroup) => {
                        const { key, ...restHeaderGroupProps } =
                            headerGroup.getHeaderGroupProps();
                        return (
                            <tr key={key} {...restHeaderGroupProps}>
                                {headerGroup.headers.map((column) => {
                                    const { key, ...restColumn } =
                                        column.getHeaderProps(
                                            column.getSortByToggleProps({
                                                title: undefined,
                                            })
                                        );
                                    return (
                                        <th
                                            className="py-2 px-2 text-left select-none"
                                            key={key}
                                            {...restColumn}
                                        >
                                            {column.render("Header")}
                                            <span>
                                                {!column.disableSortBy
                                                    ? column.isSorted
                                                        ? column.isSortedDesc
                                                            ? "👇"
                                                            : "👆"
                                                        : "😐"
                                                    : "⛔"}
                                            </span>
                                            {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>
                <tbody {...getTableBodyProps}>
                    {(Pagination ? page : rows).map((row) => {
                        prepareRow(row);
                        const { key, ...restRowProps } = row.getRowProps();
                        return (
                            <tr
                                className={`border-t border-primary-300 dark:border-dark-primary-300 hover:bg-primary-200 dark:hover:bg-dark-primary-200`}
                                key={key}
                                {...restRowProps}
                            >
                                {row.cells.map((cell) => {
                                    const { key, ...restCellProps } =
                                        cell.getCellProps();
                                    return (
                                        <td
                                            className={`py-2 px-2`}
                                            key={key}
                                            {...restCellProps}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
            {Pagination && (
                <div className="flex justify-end items-center text-sm">
                    <div className="flex items-center">
                        Row per page:
                        <select
                            value={pageSize}
                            className="h-7 py-0 w-fit pl-1 pr-4 text-center ml-1 rounded border-gray-400 text-sm"
                            onChange={(e) =>
                                setPageSize(Number(e.target.value))
                            }
                        >
                            {[5, 10, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="ml-4">
                        <span>
                            Page{" "}
                            <span>
                                <input
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    className="w-7 h-7 py-0 px-0 text-center rounded border-gray-400 text-sm spinner-disable"
                                    onChange={(e) => {
                                        const pageNumber = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0;
                                        gotoPage(pageNumber);
                                    }}
                                />{" "}
                                of {pageOptions.length}
                            </span>
                        </span>
                    </div>
                    <div className="ml-4">
                        <button
                            className="text-lg w-5 h-5 "
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            {`<`}
                        </button>
                        <button
                            className="text-lg w-5 h-5"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            {`>`}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Table;
