const state = {
  model: []
}

const mutations = {
  VERTICAL_PRICE_DATA(state, payload){
    state.model = payload
  }
}

export default {
  state,
  mutations
}