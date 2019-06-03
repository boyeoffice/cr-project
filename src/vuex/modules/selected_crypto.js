const state = {
  data: {}
}

const mutations = {
  CRYPTOCURRENCY_DATA(state, payload){
    state.data = payload
  }
}

export default {
  state,
  mutations
}