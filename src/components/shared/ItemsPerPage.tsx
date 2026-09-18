type ItemsPerPagePropsType = {
  pageSize: number;
  setPageSize: (pageSizeNumber: number) => void;
};

function ItemsPerPage({ pageSize, setPageSize }: ItemsPerPagePropsType) {
  return (
    <div className="flex items-center justify-center gap-2 py-2 md:justify-start">
      <p className="text-sm text-muted-foreground">Items per page</p>
      <select
        className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
      >
        {[5, 10, 15, 20].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ItemsPerPage;
