import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		verticalPrice: [],
		dataPrice: [],
		sortTime: [],
		sortPrice: [],
		priceHistory: [],
		selectedCryptocurrency: {}
	},
	mutations: {
		vertical_price_data(state, price){
			state.verticalPrice = price
		},
		sort_price_data(state, price){
			state.sortPrice = price
		},
		sort_time_data(state, time){
			state.sortTime = time
		},
		price_history_data(state, history){
			state.priceHistory = history
		},
		cryptocurrency_data(state, selected){
			state.selectedCryptocurrency = selected
		}
	}
})