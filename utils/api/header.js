const adminHeaders = {
    Accept: "application/json",
    "Content-type": "application/json",
    "X-Shopify-Access-Token": process.env.NEXT_PUBLIC_ADMIN_TOKEN
};
const adminURL = process.env.NEXT_PUBLIC_ADMIN_URL

const adminHeadersGraphql = {
  Accept: "application/json",
  "Content-type": "application/graphql",
  "X-Shopify-Access-Token": process.env.NEXT_PUBLIC_ADMIN_TOKEN
}
const adminURLGraphql = process.env.NEXT_PUBLIC_ADMIN_GRAPHQL_URL

const storefrontHeaders = {
  Accept: "application/json",
  "Content-Type": "application/graphql",
  "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_STOREFRONT_TOKEN,
}
const storefrontURL = process.env.NEXT_PUBLIC_STOREFRONT_URL
  
export {adminHeaders, storefrontHeaders, storefrontURL, adminURL, adminURLGraphql, adminHeadersGraphql};