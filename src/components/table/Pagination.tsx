import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdFirstPage, MdOutlineLastPage } from "react-icons/md";

type PaginationPropsType = {
  totalPages: number;
  goToFirstPage?: () => void;
  goToLastPage?: () => void;
  goToNextPage?: () => void;
  goToPreviousPage?: () => void;
  goToPage?: (page: number) => void;
  getCanPreviousPageDisabled?: boolean;
  getCanNextPageDisabled?: boolean;
  currentPage?: number;
};

function Pagination({
  totalPages,
  goToFirstPage,
  goToLastPage,
  goToNextPage,
  goToPreviousPage,
  goToPage,
  getCanPreviousPageDisabled,
  getCanNextPageDisabled,
  currentPage,
}: PaginationPropsType) {
  return (
    <div className="join">
      {/* First page button */}
      <button
        className="join-item btn btn-sm md:btn-md border-none "
        onClick={goToFirstPage}
        disabled={getCanPreviousPageDisabled}
      >
        <MdFirstPage size={20} />
      </button>

      {/* Previous page button */}
      <button
        className="join-item btn btn-sm border-none md:btn-md  "
        onClick={goToPreviousPage}
        disabled={getCanPreviousPageDisabled}
      >
        <GrFormPrevious size={20} />
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`join-item btn  btn-sm md:btn-md   border-none ${currentPage === i ? "btn-active" : ""}`}
          onClick={() => goToPage && goToPage(i)}
        >
          {i + 1}
        </button>
      ))}
      {/* Next button */}
      <button
        className="join-item btn btn-sm md:btn-md border-none "
        onClick={goToNextPage}
        disabled={getCanNextPageDisabled}
      >
        <GrFormNext size={20} />
      </button>

      {/* Last page button */}
      <button
        className="join-item btn btn-sm md:btn-md   border-none"
        onClick={goToLastPage}
        disabled={getCanNextPageDisabled}
      >
        <MdOutlineLastPage size={20} />
      </button>
    </div>
  );
}

export default Pagination;
