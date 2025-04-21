import { Button, IconButton } from "@material-tailwind/react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;

  // Hitung rentang halaman yang ditampilkan
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  // Pastikan endPage tidak melebihi totalPages
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center gap-2">
      {/* Tombol Previous */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <NavArrowLeft className="mr-1.5 h-4 w-4 stroke-2" />
      </Button>

      {/* Nomor Halaman */}
      {pageNumbers.map((page) => (
        <IconButton
          key={page}
          variant={page === currentPage ? "outline" : "ghost"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </IconButton>
      ))}

      {/* Tombol Next */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <NavArrowRight className="ml-1.5 h-4 w-4 stroke-2" />
      </Button>
    </div>
  );
};

export default Pagination;