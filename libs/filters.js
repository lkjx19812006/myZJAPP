if(Vue) {
	var filters = filters || {};
	//时间过滤
	filters.getYMD = function(time, type) {
		if(time === undefined || time === '' || time === 0) {
			return '1970-01-01 00:00:00';
		} else {
			//兼容IOS时间显示问题
			if(typeof time !== 'number') {
				time = time.replace(/\-/g, "/").split('.')[0];
			}
			var date = new Date(time);
			var y = date.getFullYear();
			var M = date.getMonth() + 1;
			var d = date.getDate();
			var dd = date.getDay();
			switch(dd) {
				case 0:
					dd = '周日';
					break;
				case 1:
					dd = '周一';
					break;
				case 2:
					dd = '周二';
					break;
				case 3:
					dd = '周三';
					break;
				case 4:
					dd = '周四';
					break;
				case 5:
					dd = '周五';
					break;
				case 6:
					dd = '周六';
					break;
			};
			var h = date.getHours();
			var m = date.getMinutes();
			var s = date.getSeconds();
			M = M < 10 ? '0' + M : M;
			d = d < 10 ? '0' + d : d;
			h = h < 10 ? '0' + h : h;
			m = m < 10 ? '0' + m : m;
			s = s < 10 ? '0' + s : s;
			switch(type) {
				case 'YYYY': //返回年
					return y + '-' + M + '-' + d;
					break;
				case 'MM': //返回 月
					return M;
					break;
				case 'DD': //返回 日
					return d;
					break;
				case 'YYYY-MM': //返回年 月
					return y + '-' + M;
					break;
				case 'YYYY-MM-DD': //返回年 月 日
					return y + '-' + M + '-' + d;
					break;
				case 'YYYY-MM-DD dd': //返回年 月 日
					return y + '-' + M + '-' + d + ' ' + dd;
					break;
				default:
					return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
					break;
			}

		}
	}

	//格式化价钱 价钱必须先乘 100 后传入	
	filters.price = function(price) {
		price = price / 100 + '';
		var len = price.length;
		var searchIndex = price.indexOf('.')
		if(searchIndex === -1) {
			return price += '.00';
		} else if(len - searchIndex === 2) {
			return price + '0';
		} else if(len - searchIndex === 3) {
			return price
		}
		return price / 100;
	}

	//获取数组中的总和 某个键对应值的总和
	filters.getTotal = function(array, key) {
		var total = 0;
		for(var i = 0; i < array.length; i++) {
			total += Number(array[i][key]) * 100;
		}
		return filters.price(total);
	}

	//注册过滤器
	for(var key in filters) {
		Vue.filter(key, filters[key])
	}
} else {
	throw new Error('Vue is not defined')
}