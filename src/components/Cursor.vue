<template>
	<g :class="cursorClass">
      <line
        class="line"
        :x1="x"
        :x2="x"
        :y1="0"
        :y2="height"
      />
      <circle
        class="circle"
        :cx="x"
        :cy="y"
        :r="CURSOR_RADIUS_SIZE"
      />
    </g>
</template>

<script>

	export default {
		data(){
			return {
			CURSOR_RADIUS_SIZE: 4,
			cursorClass: {
				Cursor: true,
			    hidden: ! this.visible,
			    show: this.visible
			  }
		   }
		},
		props: {
			height: {
				type: Number,
				default: ''
			},
			visible: {
				type: Boolean,
				default: ''
			},
			x: {
				type: Number,
				default: ''
			},
			y: {
				type: Number,
				default: ''
			}
		},
		watch: {
			visible(newVal, oldVal){
				if(this.visible === true){
					this.cursorClass.hidden = false,
				    this.cursorClass.show = true
				}else{
					this.cursorClass.hidden = true,
				     this.cursorClass.show = false
				}
			}
		}
	}
</script>