import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import dynamic from "next/dynamic";
import { debounce } from "lodash";
import { useRouter } from "next/router";

import { cartAdd, extractId, formatter, gsap } from "../../utils/utils";
import cartContext from "../../utils/cartContext";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import ImageGallery from "../../components/ProductDetails/imageGallery";
import Button from "@mui/material/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Accordion from "../../components/ProductDetails/accordion";
import { toast } from "react-toastify";
import Options from "../../components/ProductDetails/options";
import ProductSkeleton from "../../components/ProductDetails/product-skeleton";
import { productByHandle } from "../../lib/serverRequest";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";

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

export default function Product({ index }) {
  const { data } = useQuery(["product", index], () => productByHandle(index), {
    staleTime: 1000 * 60 * 60 * 24,
  });
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(0);
  const [variantId, setVariantId] = useState();
  const [variantIndex, setVariantIndex] = useState(0);
  const { setCart } = useContext(cartContext);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [options, setOptions] = useState("[]");
  const [isInStock, setIsInStock] = useState(false);
  const inputRef = useRef(0);
  const router = useRouter();
  const anim = useRef();
  let routerQuery = router.query;

  // useLayoutEffect(() => {
  //   anim.current = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".product-details",
  //       start: "top+=500 bottom",
  //       end: "bottom bottom",
  //       markers: true,
  //       pin: "#image-gallery",
  //     },
  //   });
  // }, []);

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
        handle: product.handle,
        productId: product.id,
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
            className="bg-black add-to-cart text-xs normal-case md:uppercase md:text-base w-full h-10 md:h-16 font-semibold text-white py-2 rounded-lg hover:bg-slate-100 hover:text-black"
            disabled={true}
          >
            Please select a variant
          </Button>
        );
      } else if (
        variantId &&
        product.variants.edges[
          product.variants.edges.findIndex((e) => e.node.id === variantId)
        ]?.node.quantityAvailable === 0
      ) {
        return (
          <Button
            className="bg-gray-300 add-to-cart text-xs normal-case md:uppercase md:text-base w-full h-10 md:h-16 font-semibold py-2 rounded-lg"
            disabled={true}
          >
            Sold Out
          </Button>
        );
      } else if (
        variantId &&
        product.variants.edges[
          product.variants.edges.findIndex((e) => e.node.id === variantId)
        ]?.node.quantityAvailable !== 0
      ) {
        return (
          <Button
            className="bg-black add-to-cart text-xs normal-case md:uppercase md:text-base w-full rounded-full h-10 md:h-16 font-semibold text-white py-2 hover:opacity-80"
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
          className="bg-gray-300 add-to-cart text-xs normal-case md:uppercase md:text-base w-full h-10 md:h-16 font-semibold  py-2 rounded-lg hover:bg-slate-100 hover:text-black"
          disabled={true}
        >
          Sold Out
        </Button>
      );
    }
  };

  useEffect(() => {
    setProduct(data?.data.productByHandle);
    setIsInStock(data?.data.productByHandle.availableForSale);
    if (data.data.productByHandle.variants.edges.length === 1) {
      setVariantId(data.data.productByHandle.variants.edges[0].node.id);
      setDisplayPrice(data.data.productByHandle.variants.edges[0].node.price);
    }
  }, [routerQuery]);

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
      setVariantIndex(index);
      setOriginalPrice(product.variants.edges[index].node.compareAtPrice);
    }
  }, [variantId]);

  return (
    <>
      <Breadcrumbs
        path={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          {
            name: `Product: ${product?.title ? product.title : ""}`,
            path: "#",
          },
        ]}
      />
      {!product ? (
        <ProductSkeleton />
      ) : (
        <>
          <div className="product-details pb-10 flex justify-center">
            <div className="w-11/12 relative">
              <div className="flex flex-col md:flex-row space-y-10 md:space-x-5 xl:mt-10">
                <div className="w-full md:w-1/2 xl:w-8/12 flex flex-col justify-center md:justify-start md:mt-10 space-y-5">
                  {product ? (
                    <ImageGallery
                      id={product.id}
                      tag={product.tags}
                      images={product.images.edges}
                      index={variantIndex}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-col space-y-2 md:space-y-5 w-full md:w-1/2 xl:w-4/12">
                  {/* Title */}
                  <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-5">
                    <p className="text-xl md:text-2xl xl:text-3xl font-semibold">
                      {product.title}
                    </p>
                    <p
                      className={`text-lg xl:text-xl font-semibold ${
                        originalPrice > parseInt(displayPrice)
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {handlePriceDisplay()}
                      {originalPrice > parseInt(displayPrice) ? (
                        <span className="text-lg ml-2 text-black font-semibold line-through">
                          {formatter.format(originalPrice)}
                        </span>
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                  {/* Description */}
                  {/* <p className="text-xs xl:text-xl">{product.description}</p> */}

                  {/* Options */}
                  <Options
                    handleFunc={handleVariantClick}
                    options={product.options}
                    type={
                      product.metafields[
                        product.metafields.findIndex(
                          (e) => e && e.key === "selection_type"
                        )
                      ]
                        ? product.metafields[
                            product.metafields.findIndex(
                              (e) => e && e.key === "selection_type"
                            )
                          ].value
                        : "Default"
                    }
                  />
                  <div className="cta">
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
                  </div>

                  <Accordion
                    id={extractId(product.id)}
                    description={product.descriptionHtml}
                    title={product.title}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex justify-center mt-10 md:mt-20">
              <div className="w-11/12 xl:w-3/4">
                <Reviews id={extractId(product.id)} />
              </div>
            </div> */}

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
      )}
    </>
  );
}

const queryClient = new QueryClient();
export async function getServerSideProps({ query, res }) {
  let { index } = query;
  await queryClient.prefetchQuery(
    ["product", index],
    () => productByHandle(index),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      index: index,
    },
  };
}
