import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
  storefrontHeaders,
  storefrontURL,
} from "../utils/api/header";
import redisClient from "./redis";

let vendorsGet = async () => {
  let cacheVendors = await redisClient.get("vendors");
  if (cacheVendors) {
    return JSON.parse(cacheVendors);
  } else {
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
    redisClient.set("vendors", JSON.stringify(data.data), "EX", 86400);
    return data.data;
  }
};

let productTypeGet = async () => {
  let cacheType = await redisClient.get("types");
  if (cacheType) {
    return JSON.parse(cacheType);
  } else {
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
    redisClient.set("types", JSON.stringify(data.data), "EX", 86400);
    return data.data;
  }
};

let collectionGet = async () => {
  let cacheCollections = await redisClient.get("collections");
  if (cacheCollections) {
    return JSON.parse(cacheCollections);
  } else {
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
    redisClient.set("collections", JSON.stringify(data.data), "EX", 86400);
    return data.data;
  }
};

export { vendorsGet, productTypeGet, collectionGet };
