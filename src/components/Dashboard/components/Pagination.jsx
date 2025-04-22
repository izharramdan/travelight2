import { Button, IconButton } from "@material-tailwind/react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 3;

  // Hitung rentang halaman
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Tombol Previous */}
      <Button

        className="p-2 min-w-10"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <NavArrowLeft className="h-5 w-5" />
      </Button>

      {/* Nomor Halaman */}
      {pageNumbers.map((page) => (
        <IconButton
          key={page}
          variant={page === currentPage ? "gradient" : "solid"}
          color={page === currentPage ? "primary" : "secondary"}
          className="min-w-10"
          onClick={() => onPageChange(page)}
        >
          {page}
        </IconButton>
      ))}

      {/* Tombol Next */}
      <Button

        className="p-2 min-w-10"
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <NavArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Pagination;
