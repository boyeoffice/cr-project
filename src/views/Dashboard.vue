<template>
	<div id="root">
	 <div class="App">
	<div class="dashboard">
		<div class="tabs">
			<div class="Tabs" role="tabpanel">
				<div class="Tabs-item" v-for="(data, index ) in CRYPTOCURRENCY" v-bind:class="(index === selectedCryptocurrencyIndex) && 'selected'">
					<span v-if="spotPrices[0]" class="cryptocurrency" v-on:click="getCurrency(index, data, spotPrices)">
						<span>{{ data.name }}</span><span>{{spotPrices[index].amount | currency}}</span>
					</span>
					 <span v-else class="cryptocurrency"> <span>{{ data.name }}</span></span>
				</div>
				<!-- /.Tabs-item -->
			</div>
			<!-- /.Tabs -->
			<div class="Tabs" role="tabpanel">
				<div class="Tabs-item" v-for="(data, index) in DURATION" v-bind:aria-labelledby="data.codename" tabIndex="-1"  v-on:click="getDuration(index, data)" v-bind:class="(index === selectedDurationIndex) && 'selected'">
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
						<span class="large-font">{{spotPrice.amount | currency}}</span>
					</div>
					<div class="label">{{cryptocurrencyLabel}} Price</div>
				</div>
				<!-- /.TableCell -->
				<div class="TableCell" v-if="isVisible">
					<div class="value">
						<span class="large-font">{{priceDifference | currency }}</span>
					</div>
					<div class="label">{{selectedDurationData.humanize}} ({{CURRENCY[1].key}})</div>
				</div>
				<!-- /.TableCell -->
				<div class="TableCell" v-if="isVisible">
					<div class="value">
						<span class="large-font">{{percentageDifference | currency('', 2)}}</span><span class="small-font">%</span>
					</div>
					<div class="label">{{selectedDurationData.humanize}} (%)</div>
				</div>
				<!-- /.TableCell -->
			</div>
			<!-- /.PriceTable -->
		</div>
		<!-- /.tabl -->
		<div class="chart">
			<div class="topSection">
				<div class="VerticalChartAxis left" v-if="getVerticalPrice[0]">
					<div class="tick">
						${{ getVerticalPrice[0] | formatAxisPrice }}
					</div>
					<div class="tick">
						${{ getVerticalPrice[1] | formatAxisPrice }}
					</div>
				</div>
				<!-- /.VerticalChartAxis -->
				
					<line-chart></line-chart>

			<div class="VerticalChartAxis right" v-if="getVerticalPrice[0]">
					<div class="tick">
						${{ getVerticalPrice[0] | formatAxisPrice }}
					</div>
					<div class="tick">
						${{ getVerticalPrice[1] | formatAxisPrice }}
					</div>
				</div>
				<!-- /.VerticalChartAxis -->
			</div>
			<!-- topSection -->
			<div class="HorizontalChartAxis">
				<div class="tick" v-for="tick in xAxesTime">{{tick}}</div>
			</div>
		</div>
		<!-- chart -->
	</div>
	<div class="Footer">
		<span>Powered By COINBASE</span>
	</div>
</div>
	</div>
</template>

<script>
import dashboard from '../lib/dashboard.js'
import LineChart from '@/components/LineChart'
export default {
	mixins: [dashboard],
	components: { LineChart }
}
</script>