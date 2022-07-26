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

// Get all products
let productAll = async () => {
    let url = "api/admin/query/all-products"
    let data = await axios.post(url)

    return data.data
}

// Get all collections
let collectionAll = async () => {
    let url = "api/admin/query/all-collections"
    let data = await axios.post(url)

    return data.data
}

// Create cart
let cartCreate = async () => {
    let url = "/api/storefront/mutation/cart"
    let data = await axios.post(url)
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
    let url = "/api/admin/query/customer"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Update customer info
let customerUpdate = async (params) => {
    let url = "/api/admin/mutation/customer-update"
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


export {
    productInCollection,
    productAll,
    collectionAll,
    productSearch,
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
    customerAccessToken,
    checkoutToCustomer
}