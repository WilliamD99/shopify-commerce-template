const updateSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
}

export {updateSessionStorage}