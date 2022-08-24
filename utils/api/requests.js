import axios from 'axios'

// Get search products by title
let productSearch = async (params) => {
    let url = "/api/admin/query/products-search"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Get products in collections
let productInCollection = async (params) => {
    let url = "/api/admin/query/products-in-collection"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Get product by handle
let productByHandle = async (params) => {
    let url = "/api/storefront/query/product-by-handle"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Get all products
let productAll = async (params) => {
    let url = "api/admin/query/all-products"
    let data = await axios.post(url, {
        data: params
    })

    return data.data
}

// Get all collections
let collectionAll = async () => {
    let url = "api/admin/query/all-collections"
    let data = await axios.post(url)

    return data.data
}

// Create cart
let cartCreate = async (params) => {
    let url = "/api/storefront/mutation/cart"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Get an existing cart
let cartRetrieve = async (params) => {
    let url = "/api/storefront/query/cart-get"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Add items to cart
let cartAdd = async (params) => {
    let url = "/api/storefront/mutation/cart-add"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Update cart 
let cartUpdate = async (params) => {
    let url = "/api/storefront/mutation/cart-update"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Remove item in cart
let cartRemoveItem = async (params) => {
    let url = "/api/storefront/mutation/cart-remove-item"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Customer create
let customerCreate = async (params) => {
    let url = "/api/storefront/mutation/customer-create"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// All customers (admin-only)
let customerAll = async () => {
    let url = "/api/admin/query/all-customers"
    let data = await axios.post(url)

    return data.data
}

// Get customer by id
let customerGet = async (params) => {
    let url = "/api/storefront/query/customer"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Update customer info
let customerUpdate = async (params) => {
    let url = "/api/storefront/mutation/customer-update"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Create shipping for customer
let customerCreateShipping = async (params) => {
    let url = "/api/storefront/mutation/customer-create-shipping"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Update shipping
let customerUpdateShipping = async (params) => {
    let url = "/api/storefront/mutation/customer-update-shipping"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Create customer access token
let customerAccessToken = async (params) => {
    let url = "/api/storefront/mutation/customer-access-token"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Delete customer access token
let customerAccessTokenDelete = async (params) => {
    let url = "/api/storefront/mutation/customer-access-token-delete"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Create checkout
let checkoutCreate = async (params) => {
    let url = "/api/storefront/mutation/checkout-create"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Update checkout
let checkoutUpdate = async (params) => {
    let url = "/api/storefront/mutation/checkout-update"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Update checkout shipping address
let checkoutShippingUpdate = async (params) => {
    let url = "/api/storefront/mutation/checkout-shipping"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Remove Item(s) from checkout
let checkoutItemsRemove = async (params) => {
    let url = "/api/storefront/mutation/checkout-remove"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Update email checkout
let checkoutEmailUpdate = async (params) => {
    let url = "/api/storefront/mutation/checkout-email-update"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Get vault
let checkoutVaultId = async (params) => {
    let url = "/api/admin/mutation/checkout-vault"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Associate customer with checkout
let checkoutToCustomer = async (params) => {
    let url = "/api/storefront/mutation/checkoutToCustomer"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Update checkout shipping address
let checkoutUpdateShipping = async (params) => {
    let url = "/api/storefront/mutation/checkout-shipping-address-update"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Shipping Line update
let checkoutShippingLineUpdate = async (params) => {
    let url = "/api/storefront/mutation/checkout-shipping-line"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Complete checkout with Stripe
let checkoutCompleteStripe = async (params) => {
    let url = "/api/storefront/mutation/checkout-complete-stripe"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Get all the delivery
let deliveryAll = async () => {
    let url = "/api/admin/query/delivery-all"
    let data = await axios.get(url)
    return data.data
}

// Get an order by Id
let orderGet = async (params) => {
    let url = "/api/admin/query/order-get"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

export {
    productInCollection,
    productAll,
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
    customerAccessToken,
    customerAccessTokenDelete,
    checkoutToCustomer,
    checkoutCompleteStripe,
    checkoutUpdateShipping,
    checkoutShippingLineUpdate,
    checkoutEmailUpdate,
    deliveryAll,
    orderGet
}