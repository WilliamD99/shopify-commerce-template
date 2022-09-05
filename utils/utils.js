import CryptoJS from 'crypto-js'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(
    ScrollTrigger
)


const updateSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
}

let secret_key = process.env.NEXT_PUBLIC_ENCRYPT_KEY
const encryptObject = (e) => {
    if (typeof e !== 'object') return
    let encrypt_object = CryptoJS.AES.encrypt(JSON.stringify(e), secret_key).toString()

    return encrypt_object
}
const decryptObject = (e) => {
    let decrypt_object = CryptoJS.AES.decrypt(e, secret_key)
    return JSON.parse(decrypt_object.toString(CryptoJS.enc.Utf8))
}
const encryptText = (e) => {
    if (typeof e !== 'string') return
    let encrypt_text = CryptoJS.AES.encrypt(e, secret_key).toString();

    return encrypt_text
}

const decryptText = (e) => {
    let bytes = CryptoJS.AES.decrypt(e, secret_key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}

// Add to cart
// Params: { merchantId: Product Variant ID, quantity: num }, setCart(context)
let cartAdd = (params, setCart) => {
    let items = localStorage.getItem('items')
    // If there's no item with this id
    if (items === null) {
        if (params.quantity > 0) {
        localStorage.setItem('items', JSON.stringify([{ title: params.title, merchandiseId: params.merchandiseId, quantity: params.quantity, price: params.price, image: params.image }]))
        setCart([{title: params.title, merchandiseId: params.merchandiseId, quantity: params.quantity, price: params.price, image: params.image}])
        }
        else return
    }
    else {
        items = JSON.parse(items)
        // Find the index of product (if exist)
        let index = items.findIndex(e => e.merchandiseId === params.merchandiseId)

        // If product exist
        if (index !== -1) {
        // Make sure quantity not negative
        if (items[index]['quantity'] + params.quantity > 0) {
            items[index]['quantity'] += params.quantity
        }
        else if (items[index]['quantity'] + params.quantity === 0) {
            items = items.filter(e => e.merchandiseId !== params.merchandiseId)
        }
        }
        else {
        // Make sure quantity not negative
        if (params.quantity > 0) {
            items.push({ title: params.title, merchandiseId: params.merchandiseId, quantity: params.quantity, price: params.price, image: params.image })
        }
        }
        // Update the storage
        localStorage.setItem('items', JSON.stringify(items))
        setCart(items)
    }
}

// Remove item in cart
// Params: { merchantId: Product Variant ID, quantity: num }, setCart(context)
let cartRemoveItem = (params, setCart) => {
    let items = localStorage.getItem('items')
    if (items === null) return
    else {
        items = JSON.parse(items)
        let index = items.findIndex(e => e.merchandiseId === params.merchandiseId)

        if (index !== -1) {
            items = items.filter(e => e.merchandiseId !== params.merchandiseId)
            localStorage.setItem('items', JSON.stringify(items))
            setCart(items)
        }
    }
}
// Get access token
let accessTokenExist = () => {
    let cookie = document.cookie
    cookie = cookie.split(";")
    let index = cookie.findIndex(e => e.search('token') !== -1)

    let token
    if (index !== -1) {
        token = decryptText(cookie[index].split('=')[1])
    }
    else {
        token = false
    }
    return token
}
// Delete access token
let accessTokenDelete = () => {
    let cookie = document.cookie
    cookie = cookie.split(';')
    let index = cookie.findIndex(e => e.search('token') !== -1)

    let newCookie = cookie.splice(index, 1)
    document.cookie = (newCookie.join())
}

const provinces = [
    { value: "BC", label: "British Columbia" },
    { value: "AB", label: "Alberta" },
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NS", label: "Nova Scotia" },
    { value: "NU", label: "Nunavut" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "YT", label: "Yukon" },
    { value: "SK", label: "Saskatchewan" },
]
export {
    updateSessionStorage, 
    encryptObject, 
    decryptObject,
    encryptText,
    decryptText,
    cartAdd,
    cartRemoveItem,
    accessTokenExist,
    accessTokenDelete,
    provinces,
    gsap
}