import localforage from 'localforage'

let tempStore = {
  userContext: {},
  selectedAccount: {
    account: null,
    label: null,
    cur: null,
  },
}

const syncStore = async () => {
  try {
    const response = await localforage.setItem('store', tempStore)

    if (response) tempStore = Object.assign({}, response)
  } catch (err) {
    console.log('Error:',err)
  }
}

const fetchStore = async () => {
  try {
    const response = await localforage.getItem('store')
    if (!response) syncStore()
    return !response ? tempStore : response
  } catch (err) {
    console.log('Error:',err)
  }
}

export const updateStore = (prop, data) => {
  if (prop && data) {
    localforage.getItem('store').then(function (temp) {
      if (!temp) return

      temp[prop] = data
      tempStore = temp
      syncStore()
    })

    syncStore()
  }
}

export const getStore = async () => {
  const response = await fetchStore()
  return Object.assign({}, response)
}

// export const add