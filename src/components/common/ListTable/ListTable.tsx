import React, { Fragment, ReactNode, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  useFilters,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import { Button, Col, FormGroup, Table } from "reactstrap";
import { ChevronLeft, ChevronRight, Download } from "react-feather";

// import { NotFoundData } from "../NotFoundData";
import { ComponentSpinner } from "../Spinner/LoadingSpinner";

import Styled from "./ListTable.module.scss";
import "jspdf-autotable";

interface IPageChange {
  page: number;
  pageSize: number;
}

interface IPropTypes {
  isLoading: boolean;
  tableData: any;
  columns: any;
  children?: {
    headerTable?: ReactNode;
  };
  isSccess?: boolean;
  pageCountList: number;
  customPageSize?: number;
  setPageSize?: (val: number) => void;
  onPageChange: ({ page, pageSize }: IPageChange) => void;
  getCustomProps?: any; // {props1:... , prop2:...}
  setInitialPage?: (val: number) => void;
  initialPage?: number;
  showPrint?: boolean;
  selOrientation?: boolean;
}

const ListTable: React.FC<IPropTypes> = ({
  isLoading,
  tableData,
  columns,
  children,
  pageCountList,
  customPageSize,
  onPageChange,
  setPageSize,
  getCustomProps,
  isSccess,
  setInitialPage = (val: any) => {},
  initialPage = 0,
  showPrint,
  selOrientation,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 900,
    }),
    []
  );
  const defaultData = React.useMemo(() => [], []);
  const customNewPageSize: any = { pageSize: 20000 };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  }: any = useTable(
    {
      columns,
      data: isLoading ? defaultData : tableData ? tableData : [],
      defaultColumn,
      initialState: customNewPageSize,
    },
    useResizeColumns,
    useFilters,
    useSortBy,
    usePagination,
    useFlexLayout
  );

  const tableRef: any = useRef();

  return (
    <Fragment>
      <Table
        innerRef={tableRef}
        className="rounded position-relative overflow-hidden"
        bordered
        {...getTableProps()}
        hover
        striped
        responsive
      >
        <thead className="table-header">
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="d-flex justify-content-center align-items-center">
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                  {column.canResize && (
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {isLoading ? (
          <ComponentSpinner isRelative={true} />
        ) : tableData && tableData.length > 0 ? (
          <tbody
            {...getTableBodyProps()}
            className="position-relative overflow-hidden"
          >
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    // console.log(cell.column.accessor());

                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`text-center ${Styled["text-centered"]} ${
                          cell.row.original.hasBetweenVal && Styled["no-border"]
                        }`}
                      >
                        {cell.render("Cell", {
                          ...getCustomProps,
                          setInitialPage: setInitialPage,
                        })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : (
          // <NotFoundData />
          <>no data</>
        )}
      </Table>
      {pageCountList > 1 && (
        <div
          className={`text-center`}
          style={isLoading ? { display: "none" } : {}}
        >
          <ReactPaginate
            previousLabel={
              <span className={`${Styled["page-prev"]}`}>
                <ChevronRight size={15} />
              </span>
            }
            nextLabel={
              <span className={`${Styled["page-prev"]}`}>
                <ChevronLeft size={15} />
              </span>
            }
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCountList}
            containerClassName={`disabled-pagination-btn ${Styled["pagination-holder"]}`}
            activeClassName={`${Styled["page-active"]}`}
            forcePage={initialPage}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={(page: any) => {
              setInitialPage(page.selected);
              onPageChange({
                page: page.selected + 1,
                pageSize: customPageSize ? customPageSize : 10,
              });
            }}
          />
        </div>
      )}
    </Fragment>
  );
};

export { ListTable };
