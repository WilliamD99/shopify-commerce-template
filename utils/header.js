const adminHeaders = {
    Accept: "application/json",
    "Content-type": "application/json",
    "X-Shopify-Access-Token": process.env.NEXT_PUBLIC_ADMIN_TOKEN
};

const storefrontHeaders = {
  Accept: "application/json",
  "Content-Type": "application/graphql",
  "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_STOREFRONT_TOKEN,
}
  
export {adminHeaders, storefrontHeaders};