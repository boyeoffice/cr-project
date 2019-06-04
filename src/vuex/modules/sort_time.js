const state = {
  model: []
}

const mutations =  {
  SORT_TIME_DATA(state,payload){
    state.model = payload
  }
}

export default {
  state,
  mutations
}