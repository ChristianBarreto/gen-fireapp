import TablePagination from "@mui/material/TablePagination"
import { useSearchParams } from "react-router-dom"

export default function TablePaginationFooter({
  pagination,
}: {
  pagination: any
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0", 10);
  const rowsPerPage = parseInt(searchParams.get("limit") || "10", 10);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    searchParams.set("limit", event.target.value);
    searchParams.set("page", "0");
    setSearchParams(searchParams);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      colSpan={4}
      count={pagination?.total || 0}
      rowsPerPage={rowsPerPage}
      page={page}
      slotProps={{
        select: {
          inputProps: {
            'aria-label': 'rows per page',
          },
          native: true,
        },
      }}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  )
}