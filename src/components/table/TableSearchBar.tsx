type TableSearchBarPropsType = {
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
};

function TableSearchBar({
  globalFilter,
  setGlobalFilter,
}: TableSearchBarPropsType) {
  return (
    <div className="p-2">
      <input
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search using any field.... (e.g. date, amount, method, trxId) "
        className="input input-bordered input-accent input-md  w-full "
      />
    </div>
  );
}

export default TableSearchBar;
