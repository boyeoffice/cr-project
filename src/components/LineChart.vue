<template>
	<div class="PriceChart">
		<hover-container :top="true"
		:className="containterClass"
		 :value="hoveredValue.price"
		 :visible="hovered"
         :x="hoverX"></hover-container>

		<hover-container :bottom="true"
		:className="containterClass"
		 :value="hoveredValue.time"
		  :visible="hovered"
         :x="hoverX"></hover-container>

		<svg id="node" @mousemove="updateHoverPosition"
		@mouseleave="hideHoverElements"
		@mouseenter="showHoverElements">

		<chart :color="color"
		:data="priceHistory"
		:height="dimensions.height"
		:width="dimensions.width"></chart>

		<cursor-line :height="dimensions.height"
		:visible="hovered"
         :x="hoverX"
          :y="hoverY"></cursor-line>
		</svg>
	</div>
</template>

<script>
	import HoverContainer from './HoverContainer'
	import CursorLine from './Cursor'
	import { scaleLinear } from 'd3-scale'
	import { extent } from 'd3-array'
	import Chart from './Chart'
	const CHART_PADDING_TOP = 20;
	const DEFAULT_COLOR = {
		  fill: '#FFEBC5',
		  stroke: '#FFB119',
		};
	export default {
		components: { HoverContainer, Chart, CursorLine },
		data(){
			return{
				color: {
					fill: '#FFEBC5',
					stroke: '#FFB119'
				},
				containterClass: {
    		  	HoverContainer: true,
			    hidden: true,
			    show: false
    		    },
				test: '',
				chartSvgComponent: '',
				dimensions: {
			    height: 0,
			    width: 0,
			  },
			  hovered: false,
			  hoveredValue: {},
			  hoverX: -1,
			  hoverY: -1,
			  scalePriceToY: undefined,
			}
		},
		methods: {
			 handleResize(){
				   var chartSvgComponent = document.querySelector("#node")
				   var { height, width } = chartSvgComponent.getBoundingClientRect()
				   var dimensions = {
				      height: Math.round(height),
				      width: Math.round(width),
				    }
				    this.dimensions = dimensions
			 },
			 updateHoverPosition(e) {
			 	var data = this.priceHistory
			 	var dimensions = this.dimensions
			 	   // Find closest data point to the x-coordinates of where the user's mouse is hovering
			 	var chartSvgComponent = document.querySelector("#node")
			    var hoverX = e.clientX - chartSvgComponent.getBoundingClientRect().left;
			    var index = Math.round((hoverX / dimensions.width) * (data.length - 1));
			    var hoveredDatapoint = data[index] || {};
			    var hoveredValue = {
			      price: hoveredDatapoint.price && currencyFormatter.format(hoveredDatapoint.price, { code: 'USD' }),
			      time: hoveredDatapoint.time && hoveredDatapoint.time.toLocaleString()
			        }
			       var scalePriceToY = scaleLinear()
			      .range([dimensions.height, CHART_PADDING_TOP])
			      .domain(extent(data, d => d.price));
			      var hoverY = scalePriceToY(hoveredDatapoint.price) || 0;
			      this.hovered = !!hoveredDatapoint
			      this.hoveredValue = hoveredValue
			      this.hoverX = hoverX
			      this.hoverY = hoverY
			      
			 },
			 showHoverElements(){
			 	this.hovered = true
			 	this.containterClass.hidden = false
			 	this.containterClass.show = true
			 },
			 hideHoverElements(){
			 	this.hovered = false
			 	this.containterClass.show = false
			 	this.containterClass.hidden = true
			 }
		},
		mounted(){
			this.handleResize()	
		},
		computed: {
			priceHistory(){
				return this.$store.state.priceHistory
			}
		},
		watch: {
			priceHistory(newVal, oldNew){
				this.handleResize()
			}
		}
	}
</script>