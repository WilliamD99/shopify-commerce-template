import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

export default function History({ data }) {
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(8);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="col-span-2 row-span-2 shadow-2xl border-2 rounded-md">
        <TableContainer className="">
          <Table sx={{ minWidth: 650 }} aria-label="Points history">
            <TableHead>
              <TableRow>
                <TableCell className="text-lg font-semibold">Date</TableCell>
                <TableCell align="right" className="text-lg font-semibold">
                  Action
                </TableCell>
                <TableCell align="right" className="text-lg font-semibold">
                  Order Id
                </TableCell>
                <TableCell align="right" className="text-lg font-semibold">
                  Status
                </TableCell>
                <TableCell align="right" className="text-lg font-semibold">
                  Points
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowPerPage > 0
                ? data.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                : data
              ).map((row, i) => (
                <TableRow
                  key={row.action_name + i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">{row.action}</TableCell>
                  <TableCell align="right">
                    {row.order_ids.join(", ")}
                  </TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell
                    align="right"
                    className={`${
                      parseInt(row.points) > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {row.points > 0 ? `+${row.points}` : `-${row.points}`}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {/* <TableFooter> */}
            {/* <TableRow className="w-full"> */}
            {/* </TableRow> */}
            {/* </TableFooter> */}
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={data.length}
            rowsPerPage={rowPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // ActionsComponent={TablePaginationActions}
          />
        </TableContainer>
      </div>
    </>
  );
}
