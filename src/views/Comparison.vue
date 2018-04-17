<template>
<div class="row">
	<div class="col-md-12">
  <div class="box box-default">
  	<div class="box-header with-border">
  		<div class="col-md-4 col-md-offset-4">
  			<h3 class="box-title">Cryptocurrency Comparison</h3>
  		</div>
  	</div>
		<div class="box-body">
			<table class="table table-hover">
		    <thead>
		      <tr><th v-for="th in fields">{{th.label}}</th></tr>
		    </thead>
		    <tbody>
            <tr v-for="coin in coins">
                <td>{{ coin.rank }}</td>
                <td><img :src="getCoinImage(coin.symbol)" width="25"> {{ coin.name }}</td>
                <td>{{ coin.symbol }}</td>
                <td>{{ coin.price_usd | currency }}</td>
                <td :style="getColor(coin.percent_change_1h)">
                    <span v-if="coin.percent_change_1h > 0">+</span>{{ coin.percent_change_1h }}%
                </td>
                <td :style="getColor(coin.percent_change_24h)">
                    <span v-if="coin.percent_change_24h > 0">+</span>{{ coin.percent_change_24h }}%
                </td>
                <td :style="getColor(coin.percent_change_7d)">
                    <span v-if="coin.percent_change_7d > 0">+</span>{{ coin.percent_change_7d }}%
                </td>
                <td>{{ coin.market_cap_usd | currency }}</td>
            </tr>
		    </tbody>
		  </table>
		</div>
  </div>
</div>
</div>
</template>

<script>
import Vue from 'vue'
	export default{
		name: 'Comparison',
		created(){
			document.title = 'Comparison'
			this.getCoinData()
			this.getCoins()
		},
		data(){
			return{
				coins: [],
                coinData : {},
				fields: [ {label: 'Rank'}, {label: 'Name'}, {label: 'Symbol'}, {label: 'Price (USD)'}, {label: 'Hour'}, {label: 'Day'}, {label: 'Week'}, {label: 'Market Cap (USD)'} ],
			}
		},
		ready(){
			setInterval(function(){
				this.getCoins()
			},60 * 1000)
		},
		methods: {
			getCoinData(){
				var vm = this
				axios.get(CRYPTOCOMPARE_API_URI + "/data/all/coinlist")
                .then((res) => {
                    console.log('got Data')
                    this.coinData = res.data.Data
                    vm.$ls.set('coinData', this.coinData)
                })
                .catch((err) => {
                    console.log('Error', err.message);
                })
			},
			getCoins(){
				var vm = this
				axios.get(COINMARKETCAP_API_URI + 'v1/ticker/?limit=10').then(res => {
					Vue.set(vm.$data, 'coins', res.data)
					this.$ls.set('coins', res.data)
				}).catch(err => {
					vm.revCoin()
					console.log(err)
				})
              },
            getCoinImage(symbol) {
            try {
                return BASE_IMAGE_URL + this.coinData[symbol]['ImageUrl'];
            } catch (err) {
              var offlineImg = '/assets/No_image_available.svg'
                return offlineImg
              }
            },
             getColor(num){
            return num > 0 ? "color:green;" : "color:red;";
           },
           revCoin(){
           		//retrive coins offline
           		this.coinData = this.$ls.get('coinData')
           		this.coins = this.$ls.get('coins')
           },
		 }
	}

const CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com";
const COINMARKETCAP_API_URI = "https://api.coinmarketcap.com/";
const BASE_IMAGE_URL = "https://www.cryptocompare.com"
const UPDATE_INTERVAL = 60 * 1000;
</script>

<style scoped>
	h1 {
    text-align: center;
}
</style>
