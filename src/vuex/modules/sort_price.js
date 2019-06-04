const state = {
  model: []
}

const mutations =  {
  SORT_PRICE_DATA(state, payload){
    state.model = payload
  }
}

export default {
  state,
  mutations
}