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
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    isVisible(){
      if(this.selectedDurationData.humanize)
        return true
        else
        return false
    }
  },
  mounted(){
    this.cryptocurrencyLabel = this.CRYPTOCURRENCY[0].name
    this.durationLabel = this.DURATION[2].humanize
    this.fetchSpot()
  }
}