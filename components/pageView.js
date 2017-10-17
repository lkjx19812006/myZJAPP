if(Vue) {
	//组件样式
	var styleObject = {
		color: 'red',
		fontSize: '24px'
	}
	//全局页面组件处理 支持卡头 卡尾
	Vue.component('my-page-view', {
		template: '<div :style="wrapStyle">' +
			'<slot name="header"></slot>' +
			'<div :style="contentStyle">' +
			'<slot name="content"></slot>' +
			'</div>' +
			'<slot name="footer"></slot>' +
			'</div>',
		props: {
			headerHeight: {
				type: Number,
				default: 44
			},
			footerHeight: {
				type: Number,
				default: 50
			}
		},
		data: function() {
			return {
				// 包裹盒子 样式
				wrapStyle: {
					//存在头部 改变头部页面头部高度
					paddingTop: this.$slots.header ? this.headerHeight + 'px' : 0,
					paddingBottom: this.$slots.footer ? this.footerHeight + 'px' : 0,
					height: this.$slots.header || this.$slots.footer ? '100vh' : '100%',
					width: this.$slots.header || this.$slots.footer ? '100vw' : '100%',
					boxSize: 'border-box'
				},
				// 内容盒子
				contentStyle: {
					height: '100%',
					width: '100%',
					overflow: 'hidden',
					overflowY: 'auto',
					'-webkit-overflow-scrolling': 'touch'
				}
			}
		},
		mounted: function() {

		},
		methods: {

		}
	})
} else {
	throw new Error('Vue is not defined')
}