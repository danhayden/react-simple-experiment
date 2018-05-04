import localforage from "localforage";

let storage = {};
let store;

function getStore() {
  return new Promise(resolve => {
    try {
      const data = {};
      store
        .iterate((value, key, iterationNumber) => {
          data[key] = value;
        })
        .then(() => resolve(data))
        .catch(() => resolve(storage));
    } catch (error) {
      resolve(storage);
    }
  });
}

function getItem(key) {
  return new Promise(resolve => {
    try {
      store
        .getItem(key)
        .then(value => resolve(value || storage[key]))
        .catch(() => resolve(storage[key]));
    } catch (error) {
      resolve(storage[key]);
    }
  });
}

function setItem(key, value) {
  storage[key] = value;
  return new Promise(resolve => {
    try {
      // avoid clone error from localforage
      const safeValue = JSON.parse(JSON.stringify(value));
      store
        .setItem(key, safeValue)
        .then(resolve)
        .catch(resolve);
    } catch (error) {
      resolve();
    }
  });
}

function removeItem(key) {
  if (storage[key]) delete storage[key];
  return new Promise(resolve => {
    try {
      store
        .removeItem(key)
        .then(resolve)
        .catch(resolve);
    } catch (error) {
      resolve();
    }
  });
}

export default function(options) {
  store = localforage.createInstance(options);
  return {
    getStore,
    getItem,
    setItem,
    removeItem
  };
}
