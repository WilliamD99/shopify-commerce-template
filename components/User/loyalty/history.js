import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function History({ data }) {
  return (
    <>
      <div className="col-span-3 row-span-2 shadow-2xl border-2 rounded-md">
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
              {data ? (
                data.map((row, i) => (
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
                      {row.points}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
