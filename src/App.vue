<template>
  <div id="root">
    <div class="App">
      <div class="dashboard">
        <div class="tabs">
          <div class="Tabs" role="tabpanel">
          <div :class="{'Tabs-item': true, 'selected': index === selectedCryptocurrencyIndex}" 
            v-for="(data, index) in CRYPTOCURRENCY" 
            :key="index">
              <span v-if="spotPrices[0]" class="cryptocurrency" @click="getCurrency(index, data, spotPrices)">
                <span>{{ data.name }}</span><span>{{ spotPrices[index].amount | currency }}</span>
              </span>
              <span v-else class="cryptocurrency"><span>{{ data.name }}</span></span>
            </div>
            <!-- /.Tabs-item -->
         </div>
         <!-- /.Tabs -->
         <div class="Tabs" role="tabpanel">
           <div :class="{'Tabs-item': true, 'selected': index === selectedDurationIndex}" 
              v-for="(data, index) in DURATION" 
              :key="index"
              :aria-describedby="data.codename"
              tabindex="-1" @click="getDuration(index, data)">
                <span>{{ data.codename }}</span>
              </div>
         </div>
         <!-- /.Tabs -->
        </div>
        <!-- /.tabs -->
        <div class="table">
          <div class="PriceTable">
            <div class="TableCell">
              <div class="value">
                <span class="large-font">{{ spotPrice.amount | currency}}</span>
              </div>
              <div class="label">{{ cryptocurrencyLabel }} Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      CRYPTOCURRENCY: [
			{upper: 'BTC', key: 'btc', name: 'Bitcoin', fillColor: '#FFEBC5', strokeColor: '#FFB01E'},
			{upper: 'BCH', key: 'bch', name: 'Bitcoin Cash', fillColor: '#e2f0d2', strokeColor: '#8DC451'},
			{upper: 'ETH', key: 'eth',name: 'Ethereum', fillColor: '#F0F1F8', strokeColor: '#6E7CB9'},
			{upper: 'LTC', key: 'ltc', name: 'Litecoin', fillColor: '#ECECEC', strokeColor: '#B5B5B5'}
			],
			DURATION: [
			  { key: 'hour', codename: '1H', humanize: 'since an hour ago' },
			  { key: 'day', codename: '1D', humanize: 'since yesterday' },
			  { key: 'week', codename: '1W', humanize: 'since last week' },
			  { key: 'month', codename: '1M', humanize: 'since last month' },
			  { key: 'year', codename: '1Y', humanize: 'since last year' },
			  { key: 'all', codename: 'ALL', humanize: '' },
			],
			selectedDurationData: { key: 'week', codename: '1W', humanize: 'since last week' },
			selectedCryptocurrencyData: {upper: 'BTC', key: 'btc', name: 'Bitcoin'},
			spotPrices: [],
			spotPrice: {},
			priceHistory: [],
			selectedCryptocurrencyIndex: 0,
			selectedDurationIndex: 2,
			cryptocurrencyLabel: null,
			durationLabel: null,
			CURRENCY: [
			   { key: 'cad', name: 'Canadian Dollar' },
			   { key: 'usd', name: 'US Dollar' },
			],
			priceDifference: null,
			percentageDifference: null,
			both: null,
			datacollection: null,
			xAxesTime: ''
    }
  },
  methods: {
    getCurrency(index, data, spotPrices){
      console.log(index)
      this.selectedCryptocurrencyIndex = index
      this.cryptocurrencyLabel = data.name
    },
    getDuration(index, data){
      this.selectedDurationIndex = index
      this.selectedDurationData = data
    }
  }
}
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>
