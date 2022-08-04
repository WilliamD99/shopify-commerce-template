import CryptoJS from 'crypto-js'
import {useMutation} from '@tanstack/react-query'
import { cartRetrieve } from './api/requests'

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



export {
    updateSessionStorage, 
    encryptObject, 
    decryptObject,
    encryptText,
    decryptText,
}