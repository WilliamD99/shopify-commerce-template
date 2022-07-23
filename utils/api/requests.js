import axios from 'axios'

// Get search products by title
let productSearch = async (params) => {
    let url = "/api/admin/get/products-search"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Get products in collections
let productInCollection = async (params) => {
    let url = "/api/admin/get/products-in-collection"
    let data = await axios.post(url, {
        data: params
    })
    return data.data
}

// Get all products
let productAll = async () => {
    let url = "api/admin/get/all-products"
    let data = await axios.post(url)

    return data.data
}

// Get all collections
let collectionAll = async () => {
    let url = "api/admin/get/all-collections"
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
    customerCreate
}