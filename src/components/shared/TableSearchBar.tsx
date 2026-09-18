import { Input } from "@/components/ui/input";

type TableSearchBarPropsType = {
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
};

function TableSearchBar({
  globalFilter,
  setGlobalFilter,
}: TableSearchBarPropsType) {
  return (
    <Input
      value={globalFilter ?? ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder="Search by date, amount, method, or trx ID"
    />
  );
}

export default TableSearchBar;
