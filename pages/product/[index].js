import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";

import { productByHandle } from "../../utils/api/requests";
import { cartAdd, formatter } from "../../utils/utils";
import { useMutation } from "@tanstack/react-query";
import cartContext from "../../utils/cartContext";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Chip from "@mui/material/Chip";
import ImageGallery from "../../components/ProductDetails/imageGallery";
import Alert from "@mui/material/Alert";
import Link from "../../components/common/Link";
import Loading from "../../components/Loading/dataLoading";
import Related from "../../components/ProductDetails/related/relatedProducts";

export default function Products() {
  const router = useRouter();
  const { index } = router.query;
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(0);
  const [variantId, setVariantId] = useState();
  const { setCart } = useContext(cartContext);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const inputRef = useRef(0);

  let productByHandleMutation = useMutation(async (params) => {
    let data = await productByHandle(params);
    setProduct(data.data.productByHandle);
  });

  // On change input quantity
  let onChangeInput = (e) => {
    e.preventDefault();
    setQuantity(parseInt(inputRef.current.value));
  };
  let handleVariantClick = (target, e) => {
    let chips = document.querySelectorAll(".chip-variant .MuiChip-root");
    for (let chip of chips) {
      chip.classList.remove("bg-black");
      chip.classList.remove("text-white");
    }

    let selectedChip = document.querySelector(
      `#variant-${target} .MuiChip-root`
    );
    selectedChip.classList.toggle("bg-black");
    selectedChip.classList.toggle("text-white");

    setVariantId(e.id);
    setDisplayPrice(e.price);
  };

  // Get the product
  useEffect(() => {
    if (index !== undefined) productByHandleMutation.mutate({ handle: index });
  }, [index]);

  // Keeping track of ref value using state
  useEffect(() => {
    setQuantity(parseInt(inputRef.current.value));
  }, [inputRef.current.value]);

  if (product === undefined) return <Loading />;
  return (
    <>
      <div className="product-details flex justify-center">
        <div className="w-11/12 xl:w-3/4">
          <Breadcrumbs
            path={[
              { name: "Home", path: "/" },
              { name: "Product", path: "#" },
              { name: `${product.title}`, path: "#" },
            ]}
          />

          <div className="flex flex-row space-x-20 xl:mt-16">
            <div className="w-1/3 flex flex-col justify-center space-y-5">
              {productByHandleMutation.isLoading ? (
                <></>
              ) : (
                <ImageGallery images={product.images.edges} />
              )}

              <div className="">
                {product.tags.length > 0 ? (
                  <div className="flex flex-row space-x-2">
                    <p>Tags: </p>
                    {product.tags.map((tag, index) => (
                      <Link
                        href="#"
                        className="hover:underline"
                        key={`tag-${product.title}-${index}`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-5 w-1/2">
              <p className="text-2xl font-semibold">Products {product.title}</p>
              <div className="flex flex-row space-x-10">
                <div className="flex flex-row items-center space-x-3">
                  <p className="font-semibold text-base">By:</p>
                  <Link href="#" className="text-lg italic hover:underline">
                    {product.vendor}
                  </Link>
                </div>
                {product.productType ? (
                  <>
                    <span>|</span>
                    <div className="flex flex-row items-center space-x-3">
                      <p className="font-semibold text-base">Product Type:</p>
                      <Link href="#" className="text-lg italic hover:underline">
                        {product.productType}
                      </Link>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-row items-center space-x-5">
                <p className="text-base font-semibold">Price:</p>
                <p className="text-xl">
                  {parseFloat(product.priceRange.maxVariantPrice.amount) ===
                  parseFloat(product.priceRange.minVariantPrice.amount)
                    ? `${formatter.format(
                        product.priceRange.maxVariantPrice.amount
                      )}`
                    : `${formatter.format(
                        product.priceRange.minVariantPrice.amount
                      )} - ${formatter.format(
                        product.priceRange.maxVariantPrice.amount
                      )}`}
                </p>
              </div>
              <p className="text-xl">{product.description}</p>

              <div className="flex flex-col space-y-3">
                <p className="font-semibold text-base">Select Options:</p>
                <div className="flex flex-row space-x-3">
                  {product.variants.edges.map((e) => (
                    <div
                      id={`variant-${e.node.title}`}
                      className="py-2 px-1 chip-variant"
                      onClick={() => handleVariantClick(e.node.title, e.node)}
                      key={e.node.title}
                    >
                      <Chip
                        label={e.node.title}
                        className="cursor-pointer"
                        variant="outlined"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-row">
                <button
                  onClick={() => {
                    if (parseInt(inputRef.current.value) > 0)
                      inputRef.current.value =
                        parseInt(inputRef.current.value) - 1;
                  }}
                >
                  -
                </button>
                <input
                  className="text-center text-lg"
                  type="number"
                  ref={inputRef}
                  defaultValue={0}
                  onChange={onChangeInput}
                />
                <button
                  onClick={() =>
                    (inputRef.current.value =
                      parseInt(inputRef.current.value) + 1)
                  }
                >
                  +
                </button>
              </div>
              <div className="flex flex-row justify-between items-center">
                <button
                  className="bg-slate-300 px-5 py-2 rounded-lg hover:bg-slate-400"
                  onClick={() => {
                    if (variantId && quantity > 0) {
                      let variantTitle =
                        product.variants.edges[
                          product.variants.edges.findIndex(
                            (e) => e.node.id === variantId
                          )
                        ].node.title;
                      cartAdd(
                        {
                          merchandiseId: variantId,
                          quantity: quantity,
                          image: product.featuredImage.src,
                          title: product.title,
                          price: product.variants.edges[0].node.price,
                          variantTitle: variantTitle,
                        },
                        setCart
                      );
                    } else {
                      setAlertOpen(true);
                      setTimeout(() => {
                        setAlertOpen(false);
                      }, 2000);
                    }
                  }}
                >
                  Add to cart | ${displayPrice}
                </button>
                <div className="h-full">
                  {alertOpen ? (
                    <Alert severity="warning">
                      Please select variant and/or quantity
                    </Alert>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-20">
        <div className="w-11/12 xl:w-3/4">
          <p className="text-xl font-semibold">Related Products</p>

          {product.metafields.some((e) => {
            if (e) return e.key === "related_products";
          }) ? (
            <Related
              data={
                product.metafields[
                  product.metafields.findIndex(
                    (e) => e.key === "related_products"
                  )
                ]
              }
            />
          ) : (
            <>
              <p>No related products found</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
