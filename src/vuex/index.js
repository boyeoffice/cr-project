import Vuex from'vuex';
import Vue from 'vue';
import * as actions from './actions';
import * as getters from './getters';
import verticalPrice from './modules/vertical_price';
import selectedCryptocurrency from './modules/selected_crypto';
import sortPrice from './modules/sort_price';
import sortTime from './modules/sort_time';
import priceHistory from './modules/price_history';

Vue.use(Vuex)

export const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    verticalPrice,
    selectedCryptocurrency,
    sortPrice,
    sortTime,
    priceHistory
  }
});