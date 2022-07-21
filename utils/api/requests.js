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

export {
    productInCollection,
    productAll,
    collectionAll,
    productSearch
}