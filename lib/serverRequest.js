import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
  storefrontHeaders,
  storefrontURL,
} from "../utils/api/header";
// import redisClient from "./redis";

let vendorsGet = async () => {
  let returnedData;
  // let cacheVendors = await redisClient.get("vendors");
  // if (cacheVendors) {
  //   returnedData = JSON.parse(cacheVendors);
  // } else {
  let query = `
      query productVendors {
          shop {
            productVendors(first: 200) {
              edges {
                node
              }
            }
          }
      }
      `;
  let data = await axios.post(adminURLGraphql, query, {
    headers: adminHeadersGraphql,
  });
  // redisClient.set("vendors", JSON.stringify(data.data), "EX", 86400);
  returnedData = data.data;
  // }
  // await redisClient.quit();
  return returnedData;
};

let productTypeGet = async () => {
  let returnedData;
  // let cacheType = await redisClient.get("types");
  // if (cacheType) {
  //   returnedData = JSON.parse(cacheType);
  // } else {
  let query = `
      {
          productTypes(first: 100) {
            edges {
              node
            }
          }
      }
      `;
  let data = await axios.post(storefrontURL, query, {
    headers: storefrontHeaders,
  });
  // redisClient.set("types", JSON.stringify(data.data), "EX", 86400);
  returnedData = data.data;
  // }
  return returnedData;
};

let collectionGet = async () => {
  let returnedData;
  // let cacheCollections = await redisClient.get("collections");
  // if (cacheCollections) {
  //   returnedData = JSON.parse(cacheCollections);
  // } else {
  let query = `
      {
          collections(first: 100) {
            edges {
              node {
                id
                title
                handle
                productsCount
                description
                productsCount
              }
            }
          }
      }
      `;
  let data = await axios.post(adminURLGraphql, query, {
    headers: adminHeadersGraphql,
  });
  // redisClient.set("collections", JSON.stringify(data.data), "EX", 86400);
  returnedData = data.data;
  // }
  // await redisClient.quit();
  return returnedData;
};

// This function to generate product handle to help with SSG (max is 250)
let productHandleGenerate = async () => {
  const query = `
 { products(first: 250) {
    edges {
      node {
        handle
      }
    }
  }
}
  `;
  const data = await axios.post(adminURLGraphql, query, {
    headers: adminHeadersGraphql,
  });

  return data.data;
};

let productsGet = async (params) => {
  // Limit
  const limit = params.limit ? params.limit : 12;

  // Reversed underlying list
  const reversed = params.reversed;
  let reverseQuery;
  if (reversed) reverseQuery = `reverse:${reversed}`;
  else reverseQuery = "";

  // Sort key
  const sortKey = params.sortKey;
  let sortQuery;
  if (sortKey) sortQuery = `sortKey: ${sortKey}`;
  else sortQuery = "";

  // Use for pagination
  const cursor = params.cursor;
  // True is forward, false is backward
  const direction = params.direction;
  let position;
  if (!cursor) position = `first: ${limit}`;
  else if (cursor && direction === "true")
    position = `first: ${limit}, after: "${cursor}"`;
  else if (cursor && direction === "false")
    position = `last: ${limit}, before: "${cursor}"`;
  // Query the list
  let queryArr = [];

  let priceRange = params.price; // ?price=11,20
  if (priceRange) {
    let arr = priceRange.split(",");
    priceRange = `variants.price:>=${arr[0]} variants.price:<=${arr[1]}`;
    queryArr.push(priceRange);
  }

  let instock = params.instock;
  if (instock) {
    instock = `available_for_sale:${instock}`;
    queryArr.push(instock);
  }

  let vendors = params.vendors;
  if (vendors) {
    vendors = vendors.split(",");
    let vendorQuery = vendors.map((e) => `vendor:'${e}'`).join(" OR ");
    queryArr.push(vendorQuery);
  }

  let type = params.type;
  if (type) {
    type = type.split(",");
    let vendorQuery = type.map((e) => `product_type:'${e}'`).join(" OR ");
    queryArr.push(vendorQuery);
  }

  const querySearch = queryArr.join(" ");
  const query = `
      {
          products(${position}, ${sortQuery}, ${reverseQuery}, query: "${querySearch}") {
              pageInfo {
                  hasNextPage
                  hasPreviousPage
              }
              edges {
                  cursor
                  node {
                      id
                      title
                      handle
                      vendor
                      metafields(identifiers: [
                        { namespace:"custom", key:"selection_type"},
                        { namespace:"custom", key:"related_products" }
                      ]) {
                        value
                      }
                      collections(first: 5) {
                        edges {
                          node {
                            title
                            id
                          }
                        }
                      }
                      description
                      featuredImage{
                          url
                      }
                      priceRange {
                        minVariantPrice {
                          amount
                        }
                        maxVariantPrice {
                          amount
                        }
                      }
                      vendor
                      totalInventory
                      tags
                      productType
                      variants(first: 5) {
                          edges {
                            node {
                              id
                              compareAtPrice
                              price
                            }
                          }
                      }
                  }
              }
          }
      }
  `;
  const data = await axios.post(storefrontURL, query, {
    headers: storefrontHeaders,
  });

  return data.data;
};

let productById = async (params) => {
  let query = [];
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      query.push(`${key}=${params[key]}`);
    }
  }
  const data = await axios.get(`/api/admin/query/product-by-id?${query}`);
  return data.data;
};

let productByHandleApiRoute = async (params) => {
  let query = [];
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      query.push(`${key}=${params[key]}`);
    }
  }
  const data = await axios.post(
    `/api/storefront/query/product-by-handle?${query}`
  );
  return data.data;
};

const productByHandle = async (handle) => {
  const query = `
  {
      productByHandle(handle: "${handle}") {
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
  const data = await axios.post(storefrontURL, query, {
    headers: storefrontHeaders,
  });
  return data.data;
};

const productInCollection = async (params) => {
  let handle = params.handle;
  let limit = params.limit ? params.limit : 12;
  let cursor = params.cursor;
  let direction = params.direction;
  let sortKey = params.sortKey;
  let reverse = params.reversed;

  let reverseQuery;
  if (reverse) reverseQuery = `reverse:${reverse}`;
  else reverseQuery = "";

  let sortQuery;
  if (sortKey) {
    if (sortKey === "CREATED_AT") sortKey = "CREATED";
    sortQuery = `sortKey:${sortKey}`;
  } else sortQuery = "";

  let position;
  if (!cursor) position = `first: ${limit}`;
  else if (cursor && direction === "true")
    position = `first: ${limit}, after: "${cursor}"`;
  else if (cursor && !direction !== "false")
    position = `last: ${limit}, before: "${cursor}"`;

  // Query the list
  let queryArr = [];

  let priceRange = params.price; // ?price=11,20
  if (priceRange) {
    let arr = priceRange.split(",");
    priceRange = `{ price: { min: ${arr[0]}, max: ${arr[1]} } }`;
    queryArr.push(priceRange);
  }

  let instock = params.instock;
  if (instock) {
    queryArr.push(`{available: ${instock}}`);
  }

  let vendors = params.vendors;
  if (vendors) {
    vendors = vendors.split(",");
    vendors.map((e) => queryArr.push(`{ productVendor: "${e}" }`));
  }

  // Product Type
  let type = params.type;
  if (type) {
    type = type.split(",");
    type.map((e) => queryArr.push(`{ productType: "${e}" }`));
  }

  const query = `
      {
        collection(handle:"${handle}") {
          title
          description
          handle
          products(${position}, ${sortQuery}, ${reverseQuery}, ${queryArr.length > 0 ? `filters: [${queryArr}]` : ""
    }) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              cursor
              node {
                id
                title
                handle
                tags
                totalInventory
                vendor
                priceRange {
                  maxVariantPrice {
                    amount
                  }
                  minVariantPrice {
                    amount
                  }
                }
                featuredImage {
                  url
                }
                collections(first: 5) {
                  edges {
                    node {
                      title
                      id
                    }
                  }
                }
                variants(first: 5) {
                  edges {
                    node {
                      id
                      price
                      compareAtPrice
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
  const data = await axios.post(storefrontURL, query, {
    headers: storefrontHeaders,
  });
  return data.data;
};

// For display item in search bar
const productSearchTemp = async (params) => {
  let query = [];
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      query.push(`${key}=${params[key]}`);
    }
  }
  const data = await axios.get(
    `/api/admin/query/product-search-temp?${query.join("&")}`
  );
  return data.data;
};

export {
  productHandleGenerate,
  collectionGet,
  productsGet,
  vendorsGet,
  productTypeGet,
  productByHandle,
  productInCollection,
  productSearchTemp,
  productById,
  productByHandleApiRoute,
};
