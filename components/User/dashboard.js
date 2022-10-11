import React, { useContext } from "react";
import userContext from "../../utils/userContext";
import { formatter } from "../../utils/utils";
import { useRouter } from "next/router";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import Link from "../common/Link";
import Button from "@mui/material/Button";

export default function Dashboard() {
  let { user } = useContext(userContext);
  let router = useRouter();

  return (
    <div className="flex flex-col space-y-10 justify-start">
      <div>
        <p className="text-lg">
          Hello,{" "}
          <span className="font-medium">
            {user.firstName} {user.lastName}
          </span>
        </p>
        <p className="text-lg">
          From this page, you can view your recent orders, or manage your
          account
        </p>
      </div>

      <div className="flex flex-col space-y-5">
        <p className="text-2xl font-semibold">Orders</p>
        <Table className="w-2/3 relative rounded-lg bg-slate-100">
          <TableHead>
            <TableRow>
              <TableCell className="text-base font-semibold xl:text-xl">
                Order #
              </TableCell>
              <TableCell className="text-base font-semibold xl:text-xl">
                Date
              </TableCell>
              <TableCell className="text-base font-semibold xl:text-xl">
                Total
              </TableCell>
              <TableCell className="text-base font-semibold xl:text-xl">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.orders.edges.length > 0 ? (
              user.orders.edges.map((e, i) => (
                <TableRow key={i}>
                  <TableCell className="xl:text-lg" component="th" scope="row">
                    #{e.node.orderNumber}
                  </TableCell>
                  <TableCell className="xl:text-lg">
                    {new Date(e.node.processedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    onClick={() => console.log(e)}
                    className="xl:text-lg"
                  >
                    {formatter.format(e.node.totalPriceV2.amount)}
                  </TableCell>
                  <TableCell className="xl:text-lg">
                    <Button
                      className="normal-case text-black border-black"
                      variant="outlined"
                      size="medium"
                      onClick={() => {
                        router.push(
                          `/my-account/order?id=${encodeURIComponent(
                            e.node.id
                          )}`
                        );
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No orders found</TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* <TableFooter className="relative">
                        <TableRow>
                            <Button className=''>View All</Button>
                        </TableRow>
                    </TableFooter> */}
        </Table>
      </div>
    </div>
  );
}
