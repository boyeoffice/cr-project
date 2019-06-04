const state = {
  model: []
}

const mutations =  {
  PRICE_HISTORY_DATA(state, payload){
    state.model = payload
  }
}

export default {
  state,
  mutations
}