import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";
import redisClient from "../../../../lib/redis";

const requests = async (req, res) => {
  try {
    const params = req.body.data;
    let handle = params.handle;
    let redisProduct = redisClient.get(`product-${handle}`);

    if (redisProduct) {
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
      redisClient.set(`product-${handle}`, data.data, "EX", 86400);
      res.json(data.data);
    }
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
