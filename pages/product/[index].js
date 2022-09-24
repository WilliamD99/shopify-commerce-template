import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
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
import Button from "@mui/material/Button";

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

  const handlePriceDisplay = () => {
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
      display = displayPrice;
    }

    return display;
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

          <div className="flex flex-col md:flex-row md:space-x-20 space-y-10 xl:mt-16">
            <div className="w-full md:w-1/3 flex flex-col justify-center space-y-5">
              {productByHandleMutation.isLoading ? (
                <></>
              ) : (
                <ImageGallery images={product.images.edges} />
              )}

              <div className="">
                {product.tags.length > 0 ? (
                  <div className="flex flex-row items-center space-x-2">
                    <p>Tags: </p>
                    {product.tags.map((tag, index) => (
                      <Chip
                        key={`tag-${product.title}-${index}`}
                        label={
                          <Link href="#" className="hover:underline">
                            {tag}
                          </Link>
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:space-y-5 w-full md:w-1/2">
              <p className="text-2xl font-semibold w-10/12 md:w-full">
                Products {product.title}
              </p>
              <div className="flex flex-col w-3/4 md:flex-row md:space-x-10">
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
              </div>
              <div className="w-3/4 grid grid-cols-4 md:flex md:flex-row items-center md:space-x-5">
                <p className="text-base font-semibold">Price:</p>
                <p className="text-lg md:text-xl col-span-3">
                  {handlePriceDisplay()}
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
                        className="cursor-pointer text-lg px-2 py-2"
                        variant="outlined"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-row">
                <button
                  className="text-2xl border-2 px-4 py-2 rounded-full"
                  onClick={() => {
                    if (parseInt(inputRef.current.value) > 0)
                      inputRef.current.value =
                        parseInt(inputRef.current.value) - 1;
                  }}
                >
                  -
                </button>
                <input
                  className="text-center w-24 text-lg"
                  type="number"
                  ref={inputRef}
                  defaultValue={0}
                  onChange={onChangeInput}
                />
                <button
                  className="text-2xl border-2 px-4 py-2 rounded-full"
                  onClick={() =>
                    (inputRef.current.value =
                      parseInt(inputRef.current.value) + 1)
                  }
                >
                  +
                </button>
              </div>
              <div className="mt-4 flex flex-row justify-between items-center">
                <Button
                  className="bg-slate-300 mr-5 text-white px-5 py-2 rounded-lg hover:bg-slate-400"
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
                </Button>
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

      <div className="flex justify-center mt-10 md:mt-20">
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
