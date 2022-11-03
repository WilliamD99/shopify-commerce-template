import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";
import redisClient from "../../../../lib/redis";

const requests = async (req, res) => {
  try {
    const params = req.query;
    let handle = params.handle;
    let redisProduct = await redisClient.get(`product-${handle}`);
    console.log(redisProduct);
    if (redisProduct) {
      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
      res.json(JSON.parse(redisProduct));
    } else {
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
                            collections(first: 10) {
                              edges {
                                node {
                                  title
                                }
                              }
                            }
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
      if (!data.data.errors) {
        redisClient.set(
          `product-${handle}`,
          JSON.stringify(data.data),
          "EX",
          86400
        );
      }
      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
      res.json(data.data);
    }
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
};

export default requests;
