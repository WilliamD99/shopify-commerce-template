import React from "react";
import { formatter } from "../../../utils/utils";

import { useRouter } from "next/router";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { orderGetById } from '../../../lib/serverRequest'

import Image from "../../../components/common/Image";
import Link from "../../../components/common/Link";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { AiOutlineCheck } from "react-icons/ai";
import { NextSeo } from "next-seo";

export default function Order() {
  const router = useRouter();
  const routerQuery = router.query;

  const { data } = useQuery(["order", routerQuery.order], () => orderGetById({ id: routerQuery.order }), { staleTime: 1000 * 60 * 60 * 24 })

  if (!data) return <div>No order found</div>;
  if (data.errors) return (
    <>
      <p>{data.errors[0].message}</p>
    </>
  )

  return (
    <>
      <NextSeo title={`My Order || Order ${data.data.order.name}`} description="" />
      <div className="flex relative flex-col w-2/3 ml-20 space-y-5">
        <div className="flex flex-row items-center">
          <span className="text-xl font-medium flex flex-row items-center">
            Order {data.data.order.name}
            {data.data.order.confirmed ? (
              <Chip
                className="ml-2 px-1"
                label="Confirmed"
                icon={<AiOutlineCheck />}
                color="success"
              />
            ) : null}
          </span>
        </div>
        <div className="flex flex-row space-x-10">
          <div className="w-2/3 flex flex-col space-y-5">
            <div className="px-5 py-5 flex flex-col space-y-2 bg-slate-100 w-full shadow-md rounded-md">
              <p className="text-xl">
                Created at:
                <span className="ml-2 text-lg font-semibold">
                  {new Date(data.data.order.createdAt).toUTCString()}
                </span>
              </p>
              <div className="grid grid-cols-1">
                {data.data.order.lineItems.edges.map((e, i) => (
                  <div key={i}>
                    <Divider className="my-5" />
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center space-x-2">
                        <div className="relative h-10 w-10">
                          {e.node.image ? (
                            <Image
                              layout="fill"
                              src={e.node.image.url}
                              alt={`image-${i}`}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                        <Link
                          href={`/product/${e.node.product.handle}`}
                          className="col-span-2 hover:underline"
                        >
                          {e.node.name}
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-x-10">
                        <p>
                          {formatter.format(
                            e.node.originalUnitPriceSet.presentmentMoney.amount
                          )}{" "}
                          x {e.node.quantity}
                        </p>
                        <p>
                          {formatter.format(
                            parseFloat(
                              e.node.originalUnitPriceSet.presentmentMoney
                                .amount
                            ) * e.node.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-5 py-5 flex flex-col space-y-5 bg-slate-100 w-full shadow-md rounded-md">
              {data.data.order.fullyPaid ? (
                <p className="text-xl flex flex-row items-center">
                  Paid{" "}
                  <AiOutlineCheck className="ml-2 text-lg text-green-500" />
                </p>
              ) : (
                <></>
              )}
              <div className="grid grid-cols-1 gap-y-2">
                <div className="grid grid-cols-4 justify-between">
                  <p>Subtotal</p>
                  <p className="col-span-2">
                    {data.data.order.subtotalLineItemsQuantity} items
                  </p>
                  <p className="text-right">
                    {formatter.format(
                      data.data.order.subtotalPriceSet.presentmentMoney.amount
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-4 justify-between">
                  <p>Shipping</p>
                  <p className="col-span-2">{data.data.order.shippingLine?.title}</p>
                  <p className="text-right">
                    {formatter.format(
                      data.data.order.totalShippingPriceSet.presentmentMoney.amount
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-4 justify-between">
                  <p>Tax</p>
                  <p className="col-span-2">
                    {data.data.order.taxLines[0].title} ({data.data.order.taxLines[0].rate})
                  </p>
                  <p className="text-right">
                    {formatter.format(data.data.order.totalTaxSet.presentmentMoney.amount)}
                  </p>
                </div>
                <div className="grid grid-cols-2 justify-between">
                  <p className="font-semibold">Total</p>
                  <p className="text-right font-semibold">
                    {formatter.format(
                      data.data.order.totalPriceSet.presentmentMoney.amount
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex flex-col space-y-5">
            <div className="px-5 py-5 flex flex-col space-y-3 bg-slate-100 w-full shadow-md rounded-md">
              <p className="font-bold text-xl">Note</p>
              {data.data.order.note ? (
                <p className="text-base">{data.data.order.note}</p>
              ) : (
                <p className="text-base">No notes from customer</p>
              )}
            </div>
            <div className="px-5 py-5 flex flex-col space-y-5 bg-slate-100 w-full shadow-md rounded-md">
              <p className="font-bold text-xl">Customer</p>
              <p className="font-semibold">
                {data.data.order.customer.displayName} ({data.data.order.customer.numberOfOrders}{" "}
                orders)
              </p>
              <Divider />
              <div className="flex flex-col space-y-3">
                <p className="font-semibold text-lg">Contact Information</p>
                <div className="ml-3 flex flex-col space-y-2">
                  <p>
                    {data.data.order.customer.email
                      ? data.data.order.customer.email
                      : "No email address"}
                  </p>
                  <p>
                    {data.data.order.customer.phone
                      ? data.data.order.customer.phone
                      : "No phone number"}
                  </p>
                </div>
              </div>
              <Divider />
              <div className="flex flex-col space-y-3">
                <p className="font-semibold text-lg">Shipping Address</p>
                <div className="ml-3 flex flex-col space-y-2">
                  <p>{data.data.order.shippingAddress?.address1}</p>
                  <p>
                    {data.data.order.shippingAddress?.city} {data.data.order.shippingAddress?.province}{" "}
                    {data.data.order.shippingAddress?.zip}
                  </p>
                  <p>{data.data.order.shippingAddress?.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const queryClient = new QueryClient()
export async function getServerSideProps({ query, res }) {
  const { order } = query;

  await queryClient.prefetchQuery(["order", order], () => orderGetById({ id: order }))
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    },
  };
}
