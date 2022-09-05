import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";

import { productByHandle } from "../../utils/api/requests";
import { cartAdd } from "../../utils/utils";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import cartContext from "../../utils/cartContext";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Chip from "@mui/material/Chip";

export default function Products() {
  const router = useRouter();
  const { index } = router.query;
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(0);
  const [variantId, setVariantId] = useState();
  const { setCart } = useContext(cartContext);
  const [displayPrice, setDisplayPrice] = useState(0);
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
  let handleVariantClick = (e) => {
    setVariantId(e.node.id);
    setDisplayPrice(e.node.price);
  };

  // Get the product
  useEffect(() => {
    if (index !== undefined) productByHandleMutation.mutate({ handle: index });
  }, [index]);

  // Keeping track of ref value using state
  useEffect(() => {
    setQuantity(parseInt(inputRef.current.value));
    console.log(quantity);
  }, [inputRef.current.value]);

  if (product === undefined) return <p>Loading</p>;
  return (
    <>
      <div className="flex justify-center">
        <div className="w-11/12 xl:w-3/4">
          <Breadcrumbs
            path={[
              { name: "Home", path: "/" },
              { name: "Product", path: "#" },
              { name: `${product.title}`, path: "#" },
            ]}
          />

          <div className="flex flex-row space-x-10 xl:mt-16">
            <div className="w-1/2 flex flex-col space-x-10">
              <div className="relative w-full h-80 xl:h-96">
                <Image
                  layout="fill"
                  src={product.featuredImage.src}
                  alt={product.title}
                />
              </div>
              {/* {
                product.images.edges.map((e, i)=> (
                  <div className='relative w-full h-56' key={i}>
                    <Image layout="fill" src={e.node.src}/>
                  </div>
                ))
              } */}
              <div className="">
                {product.tags.length > 0 ? (
                  <div className="flex flex-row space-x-2">
                    <p>Tags: </p>
                    {product.tags.map((tag) => (
                      <p className="" key={`tag-${product.title}`}>
                        {tag.displayName}
                      </p>
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
                  <p className="text-lg italic">{product.vendor}</p>
                </div>
                {product.productType ? (
                  <>
                    <span>|</span>
                    <div className="flex flex-row items-center space-x-3">
                      <p className="font-semibold text-base">Product Type:</p>
                      <p className="text-lg italic">{product.productType}</p>
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
                    ? `$${parseFloat(
                        product.priceRange.maxVariantPrice.amount
                      ).toFixed(2)}`
                    : `$${parseFloat(
                        product.priceRange.minVariantPrice.amount
                      ).toFixed(2)} - $${parseFloat(
                        product.priceRange.maxVariantPrice.amount
                      ).toFixed(2)}`}
                </p>
              </div>
              <p className="text-xl">{product.description}</p>

              <div className="flex flex-col space-y-3">
                <p className="font-semibold text-base">Select Options</p>
                <div className="flex flex-row space-x-3">
                  {product.variants.edges.map((e) => (
                    <div className="py-2 px-1" key={e.node.title}>
                      <Chip
                        label={e.node.title}
                        onClick={() => handleVariantClick(e)}
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
              <div>
                <button
                  className="bg-slate-300 px-5 py-2 rounded-full"
                  disabled={variantId ? false : true}
                  onClick={
                    () => console.log(product.featuredImage.src)
                    // cartAdd(
                    //   {
                    //     merchandiseId: variantId,
                    //     quantity: quantity,
                    //     image: product.featuredImage.src,
                    //     title: product.title,
                    //     price: product.variants.edges[0].node.price,
                    //   },
                    //   setCart
                    // )
                  }
                >
                  Add to cart | ${displayPrice}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
