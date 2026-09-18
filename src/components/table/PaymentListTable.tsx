import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { PaymentType } from "../../types/paymentType";
import { useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";
import Pagination from "./Pagination";
import ItemsPerPage from "./ItemsPerPage";
import TableSearchBar from "./TableSearchBar";
import EditPaymentModal from "../modals/EditPaymentModal";
import DeletePaymentModal from "../modals/PaymentDeleteModal";

type PaymentListTablePropsType = {
  data: PaymentType[];
  projectName: string;
  due: number;
};

function PaymentListTable({
  data,
  projectName,
  due,
}: PaymentListTablePropsType) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const columnHelper = createColumnHelper<PaymentType>();
  const columns = [
    columnHelper.display({
      id: "index",
      header: "#",
      cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor("paymentDate", {
      header: "Payment Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString("en-GB"),
    }),
    columnHelper.accessor("paymentAmount", {
      header: "Payment Amount",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("paymentMethod", {
      header: "Payment Method",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("transactionId", {
      id: "transactionId",
      header: "Transaction ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2 items-center">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              setSelectedPayment(info.row.original);
              setIsModalOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => {
              setSelectedPayment(info.row.original);
              setIsDeleteModalOpen(true);
            }}
          >
            Delete
          </button>
        </div>
      ),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <TableSearchBar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="overflow-x-auto my-2">
        <table className="table table-zebra">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.index}>
                    <div
                      className={`flex items-center gap-2 text-base text-secondary font-medium ${
                        header.column.getCanSort()
                          ? `cursor-pointer select-none flex items-center`
                          : ""
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanSort() && (
                        <LuArrowDownUp size={15} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="md:text-base">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col-reverse  md:flex-row justify-between items-center mt-3 gap-4">
        <ItemsPerPage
          pageSize={table.getState().pagination.pageSize}
          setPageSize={table.setPageSize}
        />
        <Pagination
          totalPages={table.getPageCount()}
          goToFirstPage={table.firstPage}
          goToLastPage={table.lastPage}
          goToNextPage={table.nextPage}
          goToPreviousPage={table.previousPage}
          goToPage={table.setPageIndex}
          getCanPreviousPageDisabled={!table.getCanPreviousPage()}
          getCanNextPageDisabled={!table.getCanNextPage()}
          currentPage={table.getState().pagination.pageIndex}
        />
      </div>

      {selectedPayment && (
        <EditPaymentModal
          modalId="editPaymentModal"
          projectName={projectName}
          due={due}
          projectId={selectedPayment.projectId || ""}
          paymentAmount={selectedPayment.paymentAmount}
          paymentDate={new Date(selectedPayment.paymentDate)}
          paymentMethod={selectedPayment.paymentMethod}
          transactionId={selectedPayment.transactionId}
          paymentId={selectedPayment._id || ""}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {selectedPayment && (
        <DeletePaymentModal
          modalId="deletePaymentModal"
          projectName={projectName}
          transactionId={selectedPayment.transactionId}
          paymentId={selectedPayment._id || ""}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          paymentAmount={selectedPayment.paymentAmount}
          paymentDate={new Date(selectedPayment.paymentDate)}
          paymentMethod={selectedPayment.paymentMethod}
        />
      )}
    </div>
  );
}

export default PaymentListTable;
