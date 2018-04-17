<template>
		<div v-bind:class="className"
		v-bind:style="{ bottom : bottom && VERTICAL_OFFSET + 'px', left : x - (HOVER_CONTAINER_WIDTH / 2) + 'px',
        top : top && VERTICAL_OFFSET + 'px'}">
			<div v-bind:class="contentClass">{{value}}</div>
		</div>
</template>

<script>
const ACTIVE_CURRENCY = 'usd';
const CHART_PADDING_TOP = 20;
const DEFAULT_COLOR = {
  fill: '#FFEBC5',
  stroke: '#FFB119',
}
    export default {
    	data(){
    		return {
    		  VERTICAL_OFFSET: -12,
    		  HOVER_CONTAINER_WIDTH: 200,
    		  contentClass: {
    		  	content: true,
    			invertColor: this.top
    		  }
    		}
    	},
    	props: {
    		className: {
    			type: Object,
    			default(){
    				return ''
    			}
    		},
    		bottom: {
    			default: false,
    			type: Boolean
    		},
    		top: {
    			default: false,
    			type: Boolean
    		},
    		value: {
    			default: '',
    			type: String
    		},
    		visible: {
    			default: false,
    			type: Boolean
    		},
    		x: {
    			default: 0,
    			type: Number
    		}
    	},
    	computed: {
    	}
    }
</script>