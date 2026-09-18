type ItemsPerPagePropsType = {
  pageSize: number;
  setPageSize: (pageSizeNumber: number) => void;
};
function ItemsPerPage({ pageSize, setPageSize }: ItemsPerPagePropsType) {
  return (
    <div className="flex gap-2 items-center w-full justify-center md:justify-start py-2">
      <div>
        <p>Items per page</p>
      </div>
      <div>
        <select
          className="select select-bordered  select-sm md:select-md"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ItemsPerPage;
