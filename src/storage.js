import localforage from 'localforage'

let storage = {}

function getItem (key) {
  return new Promise(resolve => {
    try {
      localforage
        .getItem(key)
        .then(value => resolve(value || storage[key]))
        .catch(() => resolve(storage[key]))
    } catch (error) {
      resolve(storage[key])
    }
  })
}

function setItem (key, value) {
  storage[key] = value
  return new Promise(resolve => {
    try {
      // avoid clone error from localforage
      const safeValue = JSON.parse(JSON.stringify(value))
      localforage.setItem(key, safeValue).then(resolve).catch(resolve)
    } catch (error) {
      resolve()
    }
  })
}

function removeItem (key) {
  if (storage[key]) delete storage[key]
  return new Promise(resolve => {
    try {
      localforage.removeItem(key).then(resolve).catch(resolve)
    } catch (error) {
      resolve()
    }
  })
}

export default function (options) {
  localforage.config(options)
  return {
    getItem,
    setItem,
    removeItem
  }
}
