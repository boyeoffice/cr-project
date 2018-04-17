const ACTIVE_CURRENCY = 'usd'
import { scan } from 'd3-array'
import { extent } from 'd3-array'
import Vue from 'vue'
export default {
	data(){
		return{
			list: null,
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
	mounted(){
	this.cryptocurrencyLabel = this.CRYPTOCURRENCY[0].name
	this.durationLabel = this.DURATION[2].humanize
	this.fetchSpot()
	},
	methods: {
		fetchSpot(){
			this.$store.commit('cryptocurrency_data', this.CRYPTOCURRENCY[0])
			axios.get('https://api.coinbase.com/v2/prices/' +ACTIVE_CURRENCY+ '/spot?').then(res => {
				console.log(res.data)
				var spotPrices = res.data.data
			    var formattedSpotPrices = spotPrices
	          .filter(e => ['BTC', 'BCH', 'ETH', 'LTC'].indexOf(e.base) >= 0)
	          .map(e => ({ ...e, amount: +e.amount }));
	          this.spotPrices = formattedSpotPrices
	          this.spotPrice = this.spotPrices[0]

	          var TITLE = this.CRYPTOCURRENCY[0].upper + ':' + ' ' + currencyFormatter.format(this.spotPrice.amount, { code: 'USD' })
			document.title = TITLE
			    this.fetchPrice()
			})
		},
		fetchPrice(){
			axios.get('https://www.coinbase.com/api/v2/prices/btc-usd/historic?period=week').then(res => {
				console.log(res.data)
				 var priceHistory = res.data.data.prices
				 var formattedPriceHistory = priceHistory
				 .sort((a, b) => new Date(a.time) - new Date(b.time))
		          .map(e => ({ price: +e.price, time: new Date(e.time) }));
		        this.priceHistory = formattedPriceHistory

		        var priceHistory = this.priceHistory
		        var spotPrice = this.spotPrice.amount
		        var lastIndex = scan(priceHistory, (a, b) => a.time - b.time)
		        var oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price
		         this.priceDifference = spotPrice - oldPrice
		         this.percentageDifference = ((spotPrice / oldPrice) - 1) * 100 || 0

		         //Min and Max Price
		         Vue.filter('formatAxisPrice', function(value,){
		         	return currencyFormatter.format(value, {
						    precision: 0,
						  })
		             })
		          var [minPrice, maxPrice] = extent(this.priceHistory, d => d.price)
  				  var arrayPrice = [maxPrice, minPrice]
  				  this.$store.commit('vertical_price_data', arrayPrice)

  				  //Chartjs
  				  var tickCount = 7
  				   var [minTime, maxTime] = extent(this.priceHistory, d => d.time);
				    var rangeStep = (maxTime - minTime) / (tickCount - 1);
				    var generatedTicks = [];
				    for (var i = 0; i < tickCount; i += 1) {
				      var time = new Date(minTime).valueOf();
				      generatedTicks.push(moment(time + (i * rangeStep)).format('MMM DD'));
				    }
				    this.xAxesTime = generatedTicks

				    var sortPrice = []
					var sortTime = []
				   this.priceHistory.forEach((list) => {
					sortTime.push(moment(list.time).format('MMM DD'))
					sortPrice.push(list.price)
			     	})
				    this.$store.commit('sort_price_data', sortPrice)
				   this.$store.commit('sort_time_data', sortTime)
				   this.$store.commit('price_history_data', this.priceHistory)
				  
			}).catch(err => {
				
			})
		},
		getCurrency(index, data, spotPrices){
			this.selectedCryptocurrencyIndex = index
			this.cryptocurrencyLabel = data.name
			var TITLE = data.upper + ':' + ' ' + currencyFormatter.format(spotPrices[index].amount, { code: 'USD' })
			document.title = TITLE
			//this.spotPrice = spotPrices[index]
			this.selectedCryptocurrencyData = data
			this.$store.commit('cryptocurrency_data', data)
			axios.get('https://api.coinbase.com/v2/prices/' +ACTIVE_CURRENCY+ '/spot?').then(res => {
			var spotPrices = res.data.data
			var formattedSpotPrices = spotPrices
	          .filter(e => ['BTC', 'BCH', 'ETH', 'LTC'].indexOf(e.base) >= 0)
	          .map(e => ({ ...e, amount: +e.amount }));
	          this.spotPrices = formattedSpotPrices
	          this.spotPrice = spotPrices[index]
				this.historyData(data)
			})
		},
		historyData(data){
			axios.get('https://www.coinbase.com/api/v2/prices/'+ data.key + '-' + 'usd' + '/historic?period=' + this.selectedDurationData.key).then(res => {
				var priceHistory = res.data.data.prices
				 var formattedPriceHistory = priceHistory
				 .sort((a, b) => new Date(a.time) - new Date(b.time))
		          .map(e => ({ price: +e.price, time: new Date(e.time) }));
		        this.priceHistory = formattedPriceHistory

		        var priceHistory = this.priceHistory
		        var spotPrice = this.spotPrice.amount
		        var lastIndex = scan(priceHistory, (a, b) => a.time - b.time)
		        var oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price
		         this.priceDifference = spotPrice - oldPrice
		         this.percentageDifference = ((spotPrice / oldPrice) - 1) * 100 || 0

		            //Min and Max Price
		         Vue.filter('formatAxisPrice', function(value,){
		         	return currencyFormatter.format(value, {
						    precision: 0,
						  })
		             })
		          var [minPrice, maxPrice] = extent(this.priceHistory, d => d.price)
  				  var arrayPrice = [maxPrice, minPrice]
  				  this.$store.commit('vertical_price_data', arrayPrice)


				    var sortPrice = []
					var sortTime = []
				   this.priceHistory.forEach((list) => {
					sortTime.push(moment(list.time).format('MMM DD'))
					sortPrice.push(list.price)
			     	})
				    this.$store.commit('sort_price_data', sortPrice)
				   this.$store.commit('sort_time_data', sortTime)
				   this.$store.commit('price_history_data', this.priceHistory)
		    
			})
		},
		getDuration(index, data){
			this.selectedDurationIndex = index
			 this.selectedDurationData = data
			 axios.get('https://www.coinbase.com/api/v2/prices/'+ this.selectedCryptocurrencyData.key + '-' + 'usd' + '/historic?period=' + data.key).then(res => {
			 	var priceHistory = res.data.data.prices
				 var formattedPriceHistory = priceHistory
				 .sort((a, b) => new Date(a.time) - new Date(b.time))
		          .map(e => ({ price: +e.price, time: new Date(e.time) }));
		        this.priceHistory = formattedPriceHistory

		        var priceHistory = this.priceHistory
		        var spotPrice = this.spotPrice.amount
		        var lastIndex = scan(priceHistory, (a, b) => a.time - b.time)
		        var oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price
		         this.priceDifference = spotPrice - oldPrice
		         this.percentageDifference = ((spotPrice / oldPrice) - 1) * 100 || 0

		            //Min and Max Price
		         Vue.filter('formatAxisPrice', function(value,){
		         	return currencyFormatter.format(value, {
						    precision: 0,
						  })
		             })
		          var [minPrice, maxPrice] = extent(this.priceHistory, d => d.price)
  				  var arrayPrice = [maxPrice, minPrice]
  				  this.$store.commit('vertical_price_data', arrayPrice)

  				  //Chartjs
  				  var tickCount = 7
  				   var [minTime, maxTime] = extent(this.priceHistory, d => d.time);
				    var rangeStep = (maxTime - minTime) / (tickCount - 1);
				    var generatedTicks = [];
				    for (var i = 0; i < tickCount; i += 1) {
				      var time = new Date(minTime).valueOf();
				      if(this.selectedDurationIndex === 0 || this.selectedDurationIndex === 1) {
				      	generatedTicks.push(moment(time + (i * rangeStep)).format('HH:MM A'));
				      } else if (this.selectedDurationIndex === 2 || this.selectedDurationIndex === 3 || this.selectedDurationIndex === 4){
				      	generatedTicks.push(moment(time + (i * rangeStep)).format('MMM DD'));
				      }else {
				      	generatedTicks.push(moment(time + (i * rangeStep)).format('MMM YYYY'));
				      }  
				    }
				    this.xAxesTime = generatedTicks

				    var sortPrice = []
					var sortTime = []
				   this.priceHistory.forEach((list) => {
					sortTime.push(moment(list.time).format('MMM DD'))
					sortPrice.push(list.price)
			     	})
				    this.$store.commit('sort_price_data', sortPrice)
				   this.$store.commit('sort_time_data', sortTime)
				   this.$store.commit('price_history_data', this.priceHistory)
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
	    getVerticalPrice(){
	    	return this.$store.state.verticalPrice
	    },
	   sortPrice(){
        return this.$store.state.sortPrice
      },
      sortTime(){
        return this.$store.state.sortTime
      }
	}
}