import axios from "axios";
import {
  adminHeadersGraphql,
  adminURLGraphql,
  storefrontHeaders,
  storefrontURL,
} from "../utils/api/header";

let vendorsGet = async () => {
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
  return data.data;
};

let productTypeGet = async () => {
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
  return data.data;
};

let collectionGet = async () => {
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
  return data.data;
};

export { vendorsGet, productTypeGet, collectionGet };
