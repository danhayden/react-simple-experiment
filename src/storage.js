import localforage from 'localforage'

let storage = {}
let store

function getItem(key) {
  return new Promise(resolve => {
    try {
      store
        .getItem(key)
        .then(value => resolve(value || storage[key]))
        .catch(() => resolve(storage[key]))
    } catch (error) {
      resolve(storage[key])
    }
  })
}

function setItem(key, value) {
  storage[key] = value
  return new Promise(resolve => {
    try {
      // avoid clone error from localforage
      const safeValue = JSON.parse(JSON.stringify(value))
      store
        .setItem(key, safeValue)
        .then(resolve)
        .catch(resolve)
    } catch (error) {
      resolve()
    }
  })
}

function removeItem(key) {
  if (storage[key]) delete storage[key]
  return new Promise(resolve => {
    try {
      store
        .removeItem(key)
        .then(resolve)
        .catch(resolve)
    } catch (error) {
      resolve()
    }
  })
}

export default function(options) {
  store = localforage.createInstance(options)
  return {
    getItem,
    setItem,
    removeItem
  }
}
