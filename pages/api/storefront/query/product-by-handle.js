import axios from "axios";
import { storefrontHeaders, storefrontURL } from "../../../../utils/api/header";

const requests = async (req, res) => {
  try {
    const params = req.body.data;
    let handle = params.handle;

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
                        productType
                        metafields(identifiers: [
                            { namespace: "custom", key: "related_products" },
                            { namespace: "custom", key: "vendor" }
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
                        variants(first: 5) {
                            edges {
                                node {
                                    id
                                    title
                                    price
                                    compareAtPrice
                                    image {
                                        url
                                    }
                                }
                            }
                        }
                    }

        }
        `;
    console.log(query);
    const data = await axios.post(storefrontURL, query, {
      headers: storefrontHeaders,
    });
    res.json(data.data);
  } catch (e) {
    res.json({ error: e });
  }
};

export default requests;
