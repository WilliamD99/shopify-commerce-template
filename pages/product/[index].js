import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { debounce } from "lodash";

import { cartAdd, extractId, formatter } from "../../utils/utils";
import cartContext from "../../utils/cartContext";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import ImageGallery from "../../components/ProductDetails/imageGallery";
import Loading from "../../components/Loading/dataLoading";
import Button from "@mui/material/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Accordion from "../../components/ProductDetails/accordion";
import { toast } from "react-toastify";
import Options from "../../components/ProductDetails/options";
import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../utils/api/header";

const Reviews = dynamic(
  () => import("../../components/ProductDetails/reviews"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const Related = dynamic(
  () => import("../../components/ProductDetails/related/relatedProducts"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default function Products({ data }) {
  const router = useRouter();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(0);
  const [variantId, setVariantId] = useState();
  const { setCart } = useContext(cartContext);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [options, setOptions] = useState("[]");
  const [isInStock, setIsInStock] = useState(true);
  const inputRef = useRef(0);

  let debounceInput = debounce((criteria) => {
    onChangeInput(criteria);
  }, 500);

  // On change input quantity
  let onChangeInput = (e) => {
    e.preventDefault();
    if (
      parseInt(inputRef.current.value) <=
      product.variants.edges[
        product.variants.edges.findIndex((e) => e.node.id === variantId)
      ].node.quantityAvailable
    ) {
      setQuantity(parseInt(inputRef.current.value));
    } else {
      setQuantity(0);
      toast.warning(
        `There is only ${
          product.variants.edges[
            product.variants.edges.findIndex((e) => e.node.id === variantId)
          ].node.quantityAvailable
        } items of this product instock now`
      );
    }
  };

  let handlePriceDisplay = () => {
    let display;

    if (displayPrice === 0) {
      if (
        parseFloat(product.priceRange.maxVariantPrice.amount) ===
        parseFloat(product.priceRange.minVariantPrice.amount)
      ) {
        display = formatter.format(product.priceRange.maxVariantPrice.amount);
      } else {
        display = `${formatter.format(
          product.priceRange.minVariantPrice.amount
        )} - ${formatter.format(product.priceRange.maxVariantPrice.amount)}`;
      }
    } else {
      display = formatter.format(displayPrice);
    }

    return display;
  };

  let handleVariantClick = (index, value) => {
    let state = JSON.parse(options);
    state[index] = value;
    setOptions(JSON.stringify(state));
  };

  let handleAddToCart = () => {
    let variantTitle =
      product.variants.edges[
        product.variants.edges.findIndex((e) => e.node.id === variantId)
      ].node.title;
    cartAdd(
      {
        merchandiseId: variantId,
        quantity: quantity,
        image: product.featuredImage.src,
        title: product.title,
        price:
          product.variants.edges[
            product.variants.edges.findIndex((e) => e.node.id === variantId)
          ].node.price,
        variantTitle: variantTitle,
      },
      setCart
    );
    toast.success("Added to cart");
  };

  let handleDisplayButton = () => {
    if (isInStock) {
      if (!variantId) {
        return (
          <Button
            className="bg-black add-to-cart text-base xl:mr-5 w-full h-16 font-semibold text-white px-5 py-2 rounded-lg hover:bg-slate-100 hover:text-black"
            disabled={true}
          >
            Please select a variant
          </Button>
        );
      } else if (
        variantId &&
        product.variants.edges[
          product.variants.edges.findIndex((e) => e.node.id === variantId)
        ].node.quantityAvailable === 0
      ) {
        return (
          <Button
            className="bg-black add-to-cart text-base xl:mr-5 w-full h-16 font-semibold text-white px-5 py-2 rounded-lg hover:bg-slate-100 hover:text-black"
            disabled={true}
          >
            Sold Out
          </Button>
        );
      } else if (
        variantId &&
        product.variants.edges[
          product.variants.edges.findIndex((e) => e.node.id === variantId)
        ].node.quantityAvailable !== 0
      ) {
        return (
          <Button
            className="bg-black add-to-cart text-base xl:mr-5 w-full h-16 font-semibold text-white px-5 py-2 rounded-lg hover:bg-slate-100 hover:text-black"
            onClick={handleAddToCart}
            disabled={displayPrice && quantity ? false : true}
          >
            Add to cart | ${displayPrice}
          </Button>
        );
      }
    } else {
      return (
        <Button
          className="bg-black add-to-cart text-base xl:mr-5 w-full h-16 font-semibold text-white px-5 py-2 rounded-lg hover:bg-slate-100 hover:text-black"
          disabled={true}
        >
          Sold Out
        </Button>
      );
    }
  };

  // Get the product
  useEffect(() => {
    if (data) {
      setProduct(data.data.productByHandle);
      setIsInStock(data.data.productByHandle.availableForSale);
    }
  }, []);

  useEffect(() => {
    if (product) {
      if (product.variants.edges.length === 1) {
        setVariantId(product.variants.edges[0].node.id);
        setDisplayPrice(product.variants.edges[0].node.price);
      }
    }
  }, [product]);

  // Keeping track of ref value using state
  useEffect(() => {
    setQuantity(parseInt(inputRef.current.value));
  }, [inputRef.current]);

  // Handle variants
  useEffect(() => {
    if (product) {
      if (product.options) {
        if (
          JSON.parse(options).length === product.options.length &&
          !JSON.parse(options).some((e) => e === null)
        ) {
          let combined = JSON.parse(options).join(" / ");
          let selectedIndex = product.variants.edges.findIndex(
            (e) => e.node.title === combined
          );
          setVariantId(product.variants.edges[selectedIndex].node.id);
          setDisplayPrice(product.variants.edges[selectedIndex].node.price);
        }
      }
    }
  }, [options]);

  useEffect(() => {
    if (variantId) {
      let index = product.variants.edges.findIndex(
        (e) => e.node.id === variantId
      );
      setOriginalPrice(product.variants.edges[index].node.compareAtPrice);
    }
  }, [variantId]);

  if (!product) return <Loading />;
  return (
    <>
      <Breadcrumbs
        path={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: `Product: ${product.title}`, path: "#" },
        ]}
      />
      <div className="product-details pb-10 bg-amber-50 flex justify-center">
        <div className="w-11/12 xl:w-3/4">
          <div className="flex flex-col md:flex-row space-y-10 md:space-x-5 xl:mt-16">
            <div className="w-full md:w-1/2 xl:w-2/3 flex flex-col justify-center md:justify-start md:mt-10 space-y-5">
              <ImageGallery
                id={product.id}
                tag={product.tags}
                images={product.images.edges}
              />
            </div>
            <div className="flex flex-col space-y-2 md:space-y-5 w-full md:w-1/2 xl:w-1/3">
              {/* Title */}
              <div className="flex flex-row items-center space-x-5">
                <p className="text-xl md:text-2xl xl:text-3xl font-semibold">
                  Products {product.title}
                </p>
                <p
                  className={`text-lg xl:text-xl font-semibold ${
                    originalPrice > parseInt(displayPrice) ? "text-red-500" : ""
                  }`}
                >
                  {handlePriceDisplay()}
                  {/* {originalPrice > parseInt(displayPrice) ? (
                    <span className="text-lg ml-2 text-black font-semibold line-through">
                      {formatter.format(originalPrice)}
                    </span>
                  ) : (
                    <></>
                  )} */}
                </p>
              </div>
              {/* Description */}
              <p className="text-base xl:text-xl">{product.description}</p>

              {/* Options */}
              <Options
                handleFunc={handleVariantClick}
                options={product.options}
                type={
                  product.metafields[
                    product.metafields.findIndex(
                      (e) => e.key === "selection_type"
                    )
                  ].value
                }
              />

              {/* Quantity Input */}
              <div className="flex flex-row justify-center w-full">
                <button
                  className="text-base"
                  onClick={() => {
                    if (parseInt(inputRef.current.value) > 0) {
                      inputRef.current.value =
                        parseInt(inputRef.current.value) - 1;
                      setQuantity(parseInt(inputRef.current.value));
                    }
                  }}
                  disabled={variantId ? false : true}
                >
                  <AiOutlineMinus />
                </button>
                <input
                  className="text-center bg-transparent w-24 text-2xl focus:outline-none"
                  type="number"
                  ref={inputRef}
                  defaultValue={0}
                  onChange={debounceInput}
                  disabled={variantId ? false : true}
                />
                <button
                  className="text-base"
                  onClick={() => {
                    if (
                      parseInt(inputRef.current.value) <
                      product.variants.edges[
                        product.variants.edges.findIndex(
                          (e) => e.node.id === variantId
                        )
                      ].node.quantityAvailable
                    )
                      inputRef.current.value =
                        parseInt(inputRef.current.value) + 1;
                    setQuantity(parseInt(inputRef.current.value));
                  }}
                  disabled={variantId ? false : true}
                >
                  <AiOutlinePlus />
                </button>
              </div>

              {/* Add to cart */}
              <div className="mt-4 flex flex-row justify-between items-center">
                {handleDisplayButton()}
              </div>

              <Accordion id={extractId(product.id)} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 md:mt-20">
        <div className="w-11/12 xl:w-3/4">
          <Reviews id={extractId(product.id)} />
        </div>
      </div>

      <div className="flex justify-center mt-10 md:mt-20">
        <div className="w-11/12 xl:w-3/4">
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
            <></>
          )}
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({ query }) {
  const { index } = query;

  const graphqlQuery = `
  {
      productByHandle(handle: "${index}") {
                  id
                  title
                  handle
                  description
                  productType
                  vendor
                  tags
                  availableForSale
                  productType
                  options {
                      name
                      values
                  }
                  metafields(identifiers: [
                      { namespace: "custom", key: "related_products" },
                      { namespace: "custom", key: "selection_type" }
                    ]) {
                      key
                      value
                  }
                  featuredImage {
                      src
                  }
                  priceRange {
                      maxVariantPrice {
                          amount
                      }
                      minVariantPrice {
                          amount
                      }
                  }
                  images(first: 5) {
                      edges {
                          node {
                              src
                              altText
                          }
                      }
                  }
                  variants(first: 10) {
                      edges {
                          node {
                              id
                              title
                              price
                              compareAtPrice
                              image {
                                  url
                              }
                              quantityAvailable
                          }
                      }
                  }
              }

  }
  `;

  const data = await axios.post(storefrontURL, graphqlQuery, {
    headers: storefrontHeaders,
  });

  return {
    props: {
      data: data.data,
    },
  };
}

{
  /* <div className="h-full">
                  {alertOpen ? (
                    <Alert severity="warning">
                      Please select variant and/or quantity
                    </Alert>
                  ) : (
                    <></>
                  )}
                </div> */
}
{
  /* <div className="flex flex-col w-3/4 md:flex-row md:space-x-10">
                <div className="grid grid-cols-4 md:flex md:flex-row items-center md:space-x-3">
                  <p className="font-semibold text-base">By:</p>
                  <Link
                    href="#"
                    className="col-span-2 text-lg md:italic hover:underline"
                  >
                    {product.vendor}
                  </Link>
                </div>
                {product.productType ? (
                  <>
                    <span className="hidden md:block">|</span>
                    <div className="grid grid-cols-4 md:flex md:flex-row items-center md:space-x-3">
                      <p className="font-semibold text-base">Type:</p>
                      <Link
                        href="#"
                        className="col-span-2 text-lg md:italic hover:underline"
                      >
                        {product.productType}
                      </Link>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div> */
}
