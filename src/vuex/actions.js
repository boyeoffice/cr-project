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