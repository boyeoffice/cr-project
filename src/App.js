import { scan } from 'd3-array'
import { extent } from 'd3-array'
import Vue from 'vue'
import { mapGetters } from 'vuex'
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
    },
    fetchSpot(){
      this.$store.dispatch('sendCryptoData', this.CRYPTOCURRENCY[0])
      this.$store.dispatch('fetchSpot').then(res => {
        console.log(res.data)
        let spotPrices = res.data.data
        let formatterSpotPrices = spotPrices
            .filter(e => ['BTC', 'BCH', 'ETHC', 'LTC'].indexOf(e.base) >= 0)
            .map(e => ({ ...e, amount: +e.amount}))
        this.spotPrices = formatterSpotPrices
        this.spotPrices = this.spotPrices[0]
        let TITLE = this.CRYPTOCURRENCY[0].upper + ':' + ' ' + currencyFormatter.format(
          this.spotPrice.amount, {code: 'USD'}
        )
        document.title = TITLE
        this.fetchPrice()
      }).catch(err => {
        console.log(err)
      })
    },
    fetchPrice(){
      this.$store.dispatch('fetchPrice').then(res => {
        console.log(res.data)
        var priceHistory = res.data.data.prices
        let formattedPriceHistory = priceHistory
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .map(e => ({ price: +e.pice, time: new Date(e.time) }))
        this.priceHistory = formattedPriceHistory
        var priceHistory = this.priceHistory
        let spotPrice = this.spotPrice.amount
        let lastIndex = scan(priceHistory, (a, b) => a.time - b.time)
        let oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price
        this.priceDifference = spotPrice - oldPrice
        //min and max
        Vue.filter('formatAxisPrice', (value) => {
          return currencyFormatter.format(value, {
            precision: 0
          })
        })
        let [minPice, maxPrice] = extent(this.priceHistory, d => d.price)
        let arrayPrice = [maxPrice, minPice]
        this.$store.dispatch('sendPriceData', arrayPrice)
        //Chartjs
        let tickCount = 7
        let [minTime, maxTime] = extent(this.priceHistory, d => d.time)
        let rangeStep = (maxTime - minTime) / (tickCount - 1)
        let generatedTicks = []
        for(var i = 0; i < tickCount; i += 1){
          var time = new Date(minTime).valueOf();
          generatedTicks.push(moment(time + (i * rangeStep)).format('MMM DD'))
        }
        this.xAxesTime = generatedTicks
        let sortPrice = []
        let sortTime = []
        this.priceHistory.forEach((list) => {
          sortTime.push(moment(list.time).format('MMM DD'))
          sortPrice.push(list.price)
        })
        this.$store.dispatch('sendSortPrice', sortPrice)
        this.$store.dispatch('sendSortTime', sortTime)
        this.$store.dispatch('sendPriceHistory', this.priceHistory)
      }).catch(err => {
        console.log(err)
      })
    },
    getCurrency(index, data, spotPrices){
      this.selectedCryptocurrencyIndex = index;
      this.cryptocurrencyLabel = data.name;
      var TITLE = data.upper + ':' + ' ' + currencyFormatter.format(spotPrices[index].amount, { code: 'USD' });
      document.title = TITLE;
      this.selectedCryptocurrencyData = data;
      this.$store.dispatch('sendCryptoData', data);
      this.$store.dispatch('getCurrency').then(res => {
        var spotPrices = res.data.data;
        var formatterSpotPrices = spotPrices
            .filter(e => ['BTC', 'BCH', 'ETH', 'LTC'].indexOf(e.base) >= 0).map(e => ({ ...e, amount: +e.amount}));
        this.spotPrices = formatterSpotPrices;
        this.spotPrice = spotPrices[index];
        this.historyData(data);
      })
    },
    historyData(data){
      var payload;
      payload.data_key = data.key;
      payload.selected_key = this.selectedDurationData.key;
      this.$store.dispatch('historyData', payload).then(res => {
        var priceHistory = res.data.data.prices;
        var formattedPriceHistory = priceHistory
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .map(e => ({price: +e.price, time: new Date(e.time) }));
        this.priceHistory = formattedPriceHistory;
        var priceHistory = this.priceHistory;
        var spotPrice = this.spotPrice.amount;
        var lastIndex = scan(priceHistory, (a, b) => a.time - b.time);
        var oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price;
        this.priceDifference = spotPrice - oldPrice;
        this.percentageDifference = ((spotPrice / oldPrice) - 1) * 100 || 0
        //Min and Max Price
        Vue.filter('formatAxisPrice', function(value){
          return currencyFormatter.format(value, {
            precision: 0,
          })
        })
        var [minPrice, maxPrice] = extent(this.priceHistory, d => d.price);
        console.log(minPrice)
        var arrayPrice = [maxPrice, minPrice];
        this.$store.dispatch('sendPriceData', arrayPrice);
        var sortPrice = [];
        var sortTime = [];
        this.priceHistory.forEach((list) => {
          sortTime.push(moment(list.time).format('MMM DD'));
          sortPrice.push(list.price);
        });
        this.$store.dispatch('sendSortPrice', sortPrice);
        this.$store.dispatch('sendSortTime', sortTime);
        this.$store.dispatch('sendPriceHistory', this.priceHistory);
      })
    }
  },
  computed: {
    isVisible(){
      if(this.selectedDurationData.humanize)
        return true
        else
        return false
    },
    ...mapGetters([
      'verticalPrice',
      'sortPrice',
      'sortTime',
      'priceHistoryData'
    ])
  },
  mounted(){
    this.cryptocurrencyLabel = this.CRYPTOCURRENCY[0].name
    this.durationLabel = this.DURATION[2].humanize
    this.fetchSpot()
  }
}