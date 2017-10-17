if(Vue) {
	/**
	 * Vue 扩展类 扩展自定义指令 v-model.price 格式化价格
	 * */
	Vue.directive('model', {
		bind: function(el, binding, vnode) {
			if(binding.modifiers.price) {
				el.addEventListener('input', function(e) {
					formattedHandler(e)
				})
				el.addEventListener('blur', function(e) {
					formattedHandler(e)
				})
			}
			//价钱格式工具
			var formattedValue = function(value) {
				//保留两位小数
				return value.trim().slice(
					0,
					value.indexOf('.') === -1 ? value.length : value.indexOf('.') + 3
				);
			};
			//格式话函数
			var formattedHandler = function(e) {
				var tar = formattedValue(e.target.value);
				vnode.context[binding.expression] = tar;
				e.target.value = tar;
			}
		},
	})

} else {
	throw new Error('Vue is not defind')
}