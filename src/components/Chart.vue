<template>
	<g>
		
	</g>
</template>

<script>
import isEqual from 'lodash.isequal';
import { area as d3Area, line as d3Line } from 'd3-shape';
import { easeCubicOut } from 'd3-ease';
import { extent } from 'd3-array';
import { interpolatePath } from 'd3-interpolate-path';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import 'd3-transition';
const CHART_PADDING_TOP = 20;
const TRANSITION = { duration: 500, ease: easeCubicOut };
	export default {
		mounted(){
			this.renderChart()
		},
		methods: {
			renderChart(){
				var height = this.height
				var width = this.width
				var data = this.data

				 var scalePriceToY = scaleLinear()
			      .range([height, CHART_PADDING_TOP])
			      .domain(extent(data, d => d.price))
			      var nextHeight = scalePriceToY

			       var scaleTimeToX = scaleTime()
				      .range([0, width])
				      .domain(extent(data, d => d.time))
				    var nextWidth  = scaleTimeToX

				     var data = data.map(({ price, time }) => ({
					      price: scalePriceToY(price),
					      time: scaleTimeToX(time),
					    }))
				     var nextData = data
				     this.scaledData = data
				     var scaledData = data
				 var nextScaledData = nextData
                var previousScaledData = (scaledData.length > 0) ? scaledData : nextScaledData.map(({ time }) => ({ price: nextHeight, time }))
                this.previousScaledData = previousScaledData

                var transitionDuration = (this.skipTransition) ? 0 : TRANSITION.duration;

                 var area = d3Area()
			      .x(d => d.time)
			      .y0(height)
			      .y1(d => d.price);
			    var line = d3Line()
			      .x(d => d.time)
			      .y(d => d.price);

			     var previousAreaChart = area(previousScaledData);
			    var previousLineChart = line(previousScaledData);
			    var areaChart = area(scaledData);
			    var lineChart = line(scaledData);

				var chart = select("g");
				chart
				.selectAll('path')
				.remove();

				chart
				.append('path')
				.attr('class', 'Chart-area')
				.attr('d', previousAreaChart)
				.style('fill', this.previousColor.fill)
		        .transition()
		        .duration(transitionDuration)
		        .ease(TRANSITION.ease)
		        .attrTween('d', () => interpolatePath(previousAreaChart, areaChart))
		        .style('fill', this.color.fill);

		        chart
			      .append('path')
			        .attr('class', 'Chart-line')
			        .attr('d', previousLineChart)
			        .style('stroke', this.previousColor.stroke)
			      .transition()
			        .duration(transitionDuration)
			        .ease(TRANSITION.ease)
			        .attrTween('d', () => interpolatePath(previousLineChart, lineChart))
			        .style('stroke', this.color.stroke)

			}
		},
		props: {
			color: {
				type: Object,
				default(){
					return {}
				}
			},
			data: {
				type: Array,
				default(){
					return []
				}
			},
			width: {
				type: Number,
				default: ''
			},
			height: {
				type: Number,
				default: ''
			}
		},
		data(){
			return{
			  previousColor: {fill: '#FFEBC5', stroke: '#FFB119',},
			  previousScaledData: [],
			  scaledData: [],
			  skipTransition: false,
			  test: ''
			}
		},
		watch: {
			AXESIS(newVal, oldVal){
				this.color.fill = this.selectedColor.fill
				this.color.stroke = this.selectedColor.stroke
				this.renderChart()
			}
		},
		computed: {
			AXESIS(){
				return this.$store.state.verticalPrice
			},
			selectedColor(){
				
				return { fill: this.$store.state.selectedCryptocurrency.fillColor,
				 stroke: this.$store.state.selectedCryptocurrency.strokeColor}
			}
		}
	}
</script>