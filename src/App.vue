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
            <!-- /.TableCell -->
            <div class="TableCell" v-if="isVisible">
              <div class="value">
                <span class="large-font">{{ priceDifference | currency }}</span>
              </div>
              <div class="label">{{ selectedDurationData.humanize }} ({{ CURRENCY[1].key }})</div>
            </div>
            <!-- /.TableCell -->
            <div class="TableCell" v-if="isVisible">
              <div class="value">
                <span class="large-font">
                  {{ percentageDifference | currency('', 2) }}
                </span>
                <span class="small-font">%</span>
              </div>
              <div class="label">{{ selectedDurationData.humanize }} (%)</div>
            </div>
            <!-- /.TableCell -->
          </div>
          <!-- /.PriceTable -->
        </div>
        <!-- /.table -->
      </div>
    </div>
  </div>
</template>

<script>
import App from './App.js'
export default App
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>
