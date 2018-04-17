import {Line, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins
export default{
  extends: Line,
  mixins: [reactiveProp],
  data () {
     return {
       
       //Chart.js options that controls the appearance of the chart
       options: {
         tooltips: {
          intersect: false
         },
         scales: {
           yAxes: [{
             display: false,
             ticks: {
               beginAtZero: false
             },
             gridLines: {
               display: false
             }
           }],
           xAxes: [ {
             display: false,
             gridLines: {
               display: false
             }
           }]
         },
         legend: {
           display: true
         },
         responsive: true,
         maintainAspectRatio: true
       }
     }
   },
    mounted() {
   //renderChart function renders the chart with the datacollection and options object.
     this.renderChart(this.chartData, this.options)
   }
}