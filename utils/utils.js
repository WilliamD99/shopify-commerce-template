import axios from "axios";
import CryptoJS from "crypto-js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Flip } from "gsap/dist/Flip";

gsap.registerPlugin(ScrollTrigger, Flip);

const updateSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

let secret_key = process.env.NEXT_PUBLIC_ENCRYPT_KEY;
const encryptObject = (e) => {
  try {
    if (typeof e !== "object") return;
    let encrypt_object = CryptoJS.AES.encrypt(
      JSON.stringify(e),
      secret_key
    ).toString();

    return encrypt_object;
  } catch (e) {
    console.log("Somethings went wrong..." + e);
  }
};
const decryptObject = (e) => {
  try {
    let decrypt_object = CryptoJS.AES.decrypt(e, secret_key);
    return JSON.parse(decrypt_object.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    console.log("Somethings went wrong..." + e);
  }
};
const encryptText = (e) => {
  try {
    if (typeof e !== "string") return;
    let encrypt_text = CryptoJS.AES.encrypt(e, secret_key).toString();

    return encrypt_text;
  } catch (e) {
    console.log("Somethings went wrong" + e);
  }
};

const decryptText = (e) => {
  try {
    let bytes = CryptoJS.AES.decrypt(e, secret_key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (e) {
    console.log("Somethings went wrong..." + e);
  }
};

// Add to cart
// Params: { merchantId: Product Variant ID, quantity: num }, setCart(context)
let cartAdd = async (params, setCart) => {
  let items = localStorage.getItem("items");
  let checkoutId = sessionStorage.getItem("checkoutId");
  // If there's no localStorage
  if (items === null) {
    if (params.quantity > 0) {
      localStorage.setItem(
        "items",
        JSON.stringify([
          {
            title: params.title,
            merchandiseId: params.merchandiseId,
            quantity: params.quantity,
            price: params.price,
            image: params.image,
            variantTitle: params.variantTitle,
          },
        ])
      );
      setCart([
        {
          title: params.title,
          merchandiseId: params.merchandiseId,
          quantity: params.quantity,
          price: params.price,
          image: params.image,
          variantTitle: params.variantTitle,
        },
      ]);
    } else return;
  } else {
    items = JSON.parse(items);
    // Find the index of product (if exist)
    let index = items.findIndex(
      (e) => e.merchandiseId === params.merchandiseId
    );

    // If product exist
    if (index !== -1) {
      // Make sure quantity not negative
      if (items[index]["quantity"] + params.quantity > 0) {
        items[index]["quantity"] += params.quantity;
      } else if (items[index]["quantity"] + params.quantity === 0) {
        items = items.filter((e) => e.merchandiseId !== params.merchandiseId);
      }
    } else {
      // Make sure quantity not negative
      if (params.quantity > 0) {
        items.push({
          title: params.title,
          merchandiseId: params.merchandiseId,
          quantity: params.quantity,
          price: params.price,
          image: params.image,
          variantTitle: params.variantTitle,
        });
      }
    }
    // Update the storage
    localStorage.setItem("items", JSON.stringify(items));
    if (checkoutId) {
      await axios.post("/api/storefront/mutation/checkout-update", {
        data: {
          checkoutId: decryptText(checkoutId),
          edges: items,
        },
      });
    }
    setCart(items);
  }
};

// Remove item in cart
// Params: { merchantId: Product Variant ID, quantity: num }, setCart(context)
let cartRemoveItem = async (params, setCart) => {
  let items = localStorage.getItem("items");
  let checkoutId = sessionStorage.getItem("checkoutId");
  if (items === null) return;
  else {
    items = JSON.parse(items);
    let index = items.findIndex(
      (e) => e.merchandiseId === params.merchandiseId
    );

    if (index !== -1) {
      items = items.filter((e) => e.merchandiseId !== params.merchandiseId);
      localStorage.setItem("items", JSON.stringify(items));
      if (checkoutId) {
        await axios.post("/api/storefront/mutation/checkout-update", {
          data: {
            checkoutId: decryptText(checkoutId),
            edges: items,
          },
        });
      }
      setCart(items);
    }
  }
};
// Get access token
let accessTokenExist = () => {
  let token = localStorage.getItem("tn");
  if (!token) token = false;
  token = decryptText(JSON.parse(token).value);

  return token;
};
// Delete access token
let accessTokenDelete = () => {
  localStorage.removeItem("tn");
};

// Check if object is empty
let isEmptyObj = (obj) => {
  for (let prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
};

// Extract ID
let extractId = (id) => {
  let arr = id.split("/");
  return arr[arr.length - 1];
};

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
];

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

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
  gsap,
  isEmptyObj,
  formatter,
  extractId,
  getCookie,
  setCookie,
  eraseCookie,
};
