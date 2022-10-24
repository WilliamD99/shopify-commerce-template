import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
  storefrontHeaders,
  storefrontURL,
} from "../utils/api/header";
import redisClient from "./redis";

let vendorsGet = async () => {
  let returnedData;
  let cacheVendors = await redisClient.get("vendors");
  if (cacheVendors) {
    returnedData = JSON.parse(cacheVendors);
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
    returnedData = data.data;
  }
  await redisClient.quit();
  return returnedData;
};

let productTypeGet = async () => {
  let returnedData;
  let cacheType = await redisClient.get("types");
  if (cacheType) {
    returnedData = JSON.parse(cacheType);
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
    returnedData = data.data;
  }
  await redisClient.quit();
  return returnedData;
};

let collectionGet = async () => {
  let returnedData;
  let cacheCollections = await redisClient.get("collections");
  if (cacheCollections) {
    returnedData = JSON.parse(cacheCollections);
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
    returnedData = data.data;
  }
  await redisClient.quit();
  return returnedData;
};

export { vendorsGet, productTypeGet, collectionGet };
