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
import { useMemo, useState } from "react";
import { ArrowUpDownIcon, DownloadIcon } from "lucide-react";
import { toast } from "sonner";
import { LinkedClientType } from "@/types/client";
import { PaymentType } from "@/types/payment";
import { formatCurrency, formatDate } from "@/lib/format";
import { downloadPaymentReceipt } from "@/lib/pdf";
import Pagination from "@/components/shared/Pagination";
import ItemsPerPage from "@/components/shared/ItemsPerPage";
import TableSearchBar from "@/components/shared/TableSearchBar";
import EditPaymentModal from "@/components/pages/projects/shared/EditPaymentModal";
import DeletePaymentModal from "@/components/pages/projects/shared/PaymentDeleteModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PaymentListTablePropsType = {
  data: PaymentType[];
  projectName: string;
  projectCode?: string;
  clients?: LinkedClientType[];
  due: number;
  isManager: boolean;
};

const columnHelper = createColumnHelper<PaymentType>();

function PaymentListTable({
  data,
  projectName,
  projectCode,
  clients,
  due,
  isManager,
}: PaymentListTablePropsType) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "index",
        header: "#",
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor("paymentDate", {
        header: "Payment Date",
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.accessor("paymentAmount", {
        header: "Payment Amount",
        cell: (info) => formatCurrency(info.getValue()),
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
          <div className="flex items-center gap-2">
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label="Download receipt"
              onClick={() => {
                downloadPaymentReceipt(info.row.original, {
                  name: projectName,
                  projectCode,
                  clients,
                }).catch(() => {
                  toast.error("Couldn't generate the receipt. Please try again.");
                });
              }}
            >
              <DownloadIcon />
            </Button>
            {isManager ? (
              <>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedPayment(info.row.original);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setSelectedPayment(info.row.original);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete
                </Button>
              </>
            ) : null}
          </div>
        ),
      }),
    ],
    [projectName, projectCode, clients, isManager],
  );

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
    <div className="flex flex-col gap-3">
      <TableSearchBar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <div
                    className={`flex items-center gap-2 ${
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanSort() ? (
                      <ArrowUpDownIcon className="size-3.5 text-muted-foreground" />
                    ) : null}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="md:text-base">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-1 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
        <ItemsPerPage
          pageSize={table.getState().pagination.pageSize}
          setPageSize={table.setPageSize}
        />
        <Pagination
          totalPages={table.getPageCount()}
          currentPage={table.getState().pagination.pageIndex + 1}
          onPageChange={(page) => table.setPageIndex(page - 1)}
        />
      </div>

      {selectedPayment ? (
        <EditPaymentModal
          key={`edit-${selectedPayment._id}`}
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
      ) : null}
      {selectedPayment ? (
        <DeletePaymentModal
          key={`delete-${selectedPayment._id}`}
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
      ) : null}
    </div>
  );
}

export default PaymentListTable;
