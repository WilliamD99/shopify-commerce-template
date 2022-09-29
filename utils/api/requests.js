import axios from "axios";

// Get search products by title
let productSearch = async (params) => {
  let url = "/api/admin/query/products-search";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Get products in collections
let productInCollection = async (params) => {
  let url = "/api/admin/query/products-in-collection";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Get product by handle
let productByHandle = async (params) => {
  let url = "/api/storefront/query/product-by-handle";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Get product by id
let productById = async (params) => {
  let url = "/api/admin/query/product-by-id";
  let data = await axios.post(url, {
    data: params,
  });

  return data.data;
};

// Get all products
let productAll = async (params) => {
  let url = "/api/admin/query/all-products";
  let data = await axios.post(url, {
    data: params,
  });

  return data.data;
};

// Get all products storefront
let productAllStorefront = async (params) => {
  let url = "/api/storefront/query/product-all";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Get all collections
let collectionAll = async () => {
  let url = "api/admin/query/all-collections";
  let data = await axios.post(url);

  return data.data;
};

// Create cart
let cartCreate = async (params) => {
  let url = "/api/storefront/mutation/cart";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Get an existing cart
let cartRetrieve = async (params) => {
  let url = "/api/storefront/query/cart-get";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Add items to cart
let cartAdd = async (params) => {
  let url = "/api/storefront/mutation/cart-add";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Update cart
let cartUpdate = async (params) => {
  let url = "/api/storefront/mutation/cart-update";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Remove item in cart
let cartRemoveItem = async (params) => {
  let url = "/api/storefront/mutation/cart-remove-item";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Customer create
let customerCreate = async (params) => {
  let url = "/api/storefront/mutation/customer-create";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// All customers (admin-only)
let customerAll = async () => {
  let url = "/api/admin/query/all-customers";
  let data = await axios.post(url);

  return data.data;
};

// Get customer by id
let customerGet = async (params) => {
  let url = "/api/storefront/query/customer";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Update customer info
let customerUpdate = async (params) => {
  let url = "/api/storefront/mutation/customer-update";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

let customerUpdateWishlist = async (params) => {
  let url = "/api/admin/mutation/customer-update-meta";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Create shipping for customer
let customerCreateShipping = async (params) => {
  let url = "/api/storefront/mutation/customer-create-shipping";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Update shipping
let customerUpdateShipping = async (params) => {
  let url = "/api/storefront/mutation/customer-update-shipping";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Update default address
let customerDefaultAddressUpdate = async (params) => {
  let url = "/api/storefront/mutation/customer-update-default-address";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Create customer access token
let customerAccessToken = async (params) => {
  let url = "/api/storefront/mutation/customer-access-token";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Delete customer access token
let customerAccessTokenDelete = async (params) => {
  let url = "/api/storefront/mutation/customer-access-token-delete";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Create checkout
let checkoutCreate = async (params) => {
  let url = "/api/storefront/mutation/checkout-create";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Update checkout
let checkoutUpdate = async (params) => {
  let url = "/api/storefront/mutation/checkout-update";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Update checkout shipping address
let checkoutShippingUpdate = async (params) => {
  let url = "/api/storefront/mutation/checkout-shipping";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Remove Item(s) from checkout
let checkoutItemsRemove = async (params) => {
  let url = "/api/storefront/mutation/checkout-remove";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Update email checkout
let checkoutEmailUpdate = async (params) => {
  let url = "/api/storefront/mutation/checkout-email-update";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Apply discount code to checkout
let checkoutAddDiscount = async (params) => {
  let url = "/api/storefront/mutation/checkout-discount";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Remove discount code
let checkoutRemoveDiscount = async (params) => {
  let url = "/api/storefront/mutation/checkout-discount-remove";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Get vault
let checkoutVaultId = async (params) => {
  let url = "/api/admin/mutation/checkout-vault";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Associate customer with checkout
let checkoutToCustomer = async (params) => {
  let url = "/api/storefront/mutation/checkoutToCustomer";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Update checkout shipping address
let checkoutUpdateShipping = async (params) => {
  let url = "/api/storefront/mutation/checkout-shipping-address-update";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Shipping Line update
let checkoutShippingLineUpdate = async (params) => {
  let url = "/api/storefront/mutation/checkout-shipping-line";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

let checkoutGet = async (params) => {
  let url = "/api/storefront/query/checkout-get";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Complete checkout with Stripe
let checkoutCompleteStripe = async (params) => {
  let url = "/api/storefront/mutation/checkout-complete-stripe";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Get all the delivery
let deliveryAll = async () => {
  let url = "/api/admin/query/delivery-all";
  let data = await axios.get(url);
  return data.data;
};

// Get an order by Id
let orderGet = async (params) => {
  let url = "/api/admin/query/order-get";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

let vendorGet = async () => {
  let url = "/api/admin/query/vendors-get";
  let data = await axios.get(url);

  return data.data;
};

let productTypeGet = async () => {
  let url = "/api/storefront/query/product-type-get";
  let data = await axios.get(url);
  return data.data;
};

// Loyalty

// Get customer profile
let customer_get_loyalty = async (params) => {
  let url = "/api/loyalty/get_customer";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Get all the available redemption options for that customer
let redemption_get_loyalty = async (params) => {
  let url = "/api/loyalty/get_redemption_option";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Set/Edit customer birthday
let bd_post_loyalty = async (params) => {
  let url = "/api/loyalty/post_customer_bd";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

// Retrieve a redemption option for that customer (reward)
let redemption_post_loyalty = async (params) => {
  let url = "/api/loyalty/post_redemptions";
  let data = await axios.post(url, {
    data: params,
  });
  return data.data;
};

export {
  customer_get_loyalty,
  redemption_post_loyalty,
  bd_post_loyalty,
  redemption_get_loyalty,
  productInCollection,
  productAll,
  productAllStorefront,
  productById,
  collectionAll,
  productSearch,
  productByHandle,
  cartCreate,
  cartRetrieve,
  cartAdd,
  cartUpdate,
  cartRemoveItem,
  customerCreate,
  customerAll,
  customerGet,
  customerUpdate,
  checkoutCreate,
  checkoutUpdate,
  checkoutShippingUpdate,
  checkoutItemsRemove,
  checkoutVaultId,
  customerCreateShipping,
  customerUpdateShipping,
  customerUpdateWishlist,
  customerDefaultAddressUpdate,
  customerAccessToken,
  customerAccessTokenDelete,
  checkoutToCustomer,
  checkoutGet,
  checkoutAddDiscount,
  checkoutRemoveDiscount,
  checkoutCompleteStripe,
  checkoutUpdateShipping,
  checkoutShippingLineUpdate,
  checkoutEmailUpdate,
  deliveryAll,
  orderGet,
  vendorGet,
  productTypeGet,
};
