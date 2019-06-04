const ACTIVE_CURRENCY = 'usd'
export const fetchSpot = ({commit}, payload) => {
  return new Promise((resolve, reqject) => {
    axios.get('https://api.coinbase.com/v2/prices/' +ACTIVE_CURRENCY+ '/spot?').then(res => {
      resolve(res)
    }).catch(err => {

    })
  })
}

export const sendCryptoData = ({commit}, payload) => {
  commit('CRYPTOCURRENCY_DATA', payload)
}

export const fetchPrice = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    axios.get('https://www.coinbase.com/api/v2/prices/btc-usd/historic?period=week').then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const sendPriceData = ({commit}, payload) => {
  commit('VERTICAL_PRICE_DATA', payload)
}

export const sendSortPrice = ({commit}, payload) => {
  commit('SORT_PRICE_DATA', payload)
}

export const sendSortTime = ({commit}, payload) => {
  commit('SORT_TIME_DATA', payload)
}

export const sendPriceHistory = ({commit}, payload) => {
  commit('PRICE_HISTORY_DATA', payload)
}