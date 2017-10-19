/**
 * 工具类
 * */
if(Vue) {
	var utils = utils || {}
	//	/**
	//	 * 过滤组件函数 拿到父组件下指定名称的子组件
	//	 * 适用于 无状态组件 获取子组件
	//	 * @param context 函数式组件下的context
	//	 * @param componentName 子组件名称
	//	 */
	//	utils.filterSlotsComponents = function(context, componentName) {
	//		if(!context.children) return '';
	//		for(var i = 0; i < context.children.length; i++) {
	//			if(context.children[i].functionalOptions &&
	//				context.children[i].functionalOptions['name'] === componentName) {
	//				return context.children[i];
	//			}
	//		}
	//		return '';
	//	};

	/**
	 * 工具类全局配置
	 * */
	utils.config = {
		normalColor: '#000', //默认字体颜色
		activeColor: '#FF7F27', //全局文字激活颜色
		indexPages: ['html/list.html', 'html/chart.html', 'html/user.html']
	}

	/**
	 * View 画原生控件
	 * @id {string}
	 * @styles {object}
	 * @tags {Array}
	 * */
	utils.drawNativeView = function(id, styles, tags) {
		var view = new plus.nativeObj.View(id, styles, tags);
		return view;
	};

	/**
	 * @cuurId 控件自身ID
	 * */
	utils.updateIconView = function(cuurId) {
		var parentObj = plus.webview.currentWebview();
		if(parentObj && typeof parentObj === 'object') {
			var subNViews = parentObj.getStyle()['subNViews'] || [];
			for(var i = 0; i < 4; i++) {
				if(subNViews[i].id === cuurId) {
					this.updateSubNView(subNViews[i], 'active');
				} else {
					this.updateSubNView(subNViews[i]);
				}
			}

		} else {
			throw new Error('parentObj is not defind')
		}
	}
	/**
	 *工具类  改变文字对象颜色
	 * @param  obj 文字样式对象
	 * @param type 激活样式类型
	 * 颜色为全局配置颜色
	 * */
	utils.changeColor = function(obj, type) {
		obj.color = type === 'active' ? this.config.activeColor : this.config.normalColor;
		return obj;
	}

	/**
	 * 更新icon颜色
	 * */
	utils.updateSubNView = function(viewObj, changeColorType) {
		var _self = plus.webview.currentWebview();
		var arr = [];
		for(var i = 0; i < viewObj.tags.length; i++) {
			var obj = {};
			obj.tag = viewObj.tags[i].tag;
			obj.id = viewObj.tags[i].id;
			obj.position = viewObj.tags[i].position;
			obj.text = viewObj.tags[i].text;
			obj.textStyles = this.changeColor(viewObj.tags[i].textStyles, changeColorType);
			arr.push(obj);
		}
		_self.updateSubNViews([{
			id: viewObj.id,
			tags: arr
		}])

	}

	/**
	 * 工具类 预加载页面
	 * @param string
	 * @param string
	 * @param object
	 * @param object
	 * @returns object
	 * */
	utils.prePages = function(url, pageID, styles, extras) {
		return mui.preload({
			url: url,
			id: pageID, //默认使用当前页面的url作为id
			styles: styles,
			extras: extras
		});
	}

	/**
	 * 工具类 获取Storage 中key 对应的值
	 * @param key
	 * */
	utils.getItem = function(key) {
		return plus.storage.getItem(key)
	};

	/**
	 * 工具类 设置Storage 中key 对应的值
	 * @param key
	 * @param value
	 * */
	utils.setItem = function(key, value) {
		plus.storage.setItem(key, value);
	};

	/**
	 * 工具类 移除置Storage 中key 对应的值
	 * @param key
	 * */
	utils.removeItem = function(key) {
		plus.storage.removeItem(key);
	};

	/**
	 * 工具类 清除所有置Storage的值
	 * @param key
	 * */
	utils.clear = function() {
		plus.storage.clear();
	};

	/**
	 * 设置 storage data 对应的值
	 * @param key
	 * @param value
	 * @param callback
	 * */
	utils.setData = function(key, value, callback) {
		var target = this.getData(key);
		//console.log(JSON.stringify(target));
		//重开头插入
		target.unshift(value)
		this.setItem(key, JSON.stringify(target));
		if(mui) {
			mui.toast('记录成功！！！')
		}
		if(callback) {
			callback()
		}
	}

	/**
	 * 获取 storage data的值
	 * @param key
	 * */
	utils.getData = function(key) {
		return JSON.parse(this.getItem(key)) || [];
	}

	/**
	 * 获取时间年 传入一个时间戳 获取该时间戳的年月日 周
	 * @param date 时间戳
	 * @param type Y=年; M=月;  D=周;  d=日 
	 * @return {}//返回年月日周
	 * */
	utils.getTime = function(date, type) {
		date = new Date(date);
		var Y = date.getFullYear();
		var M = date.getMonth() + 1;
		var D = date.getDate();
		var d = date.getDay();
		return {
			Y: Y,
			M: M,
			D: D,
			d: d
		}
	}

	/**
	 * 判断时间是否属于本周
	 * @param date
	 **/
	utils.hasDate = function(date) {
		var nowDate = new Date();
		var Y = nowDate.getFullYear();
		var M = nowDate.getMonth() + 1;
		M = M + 1 < 10 ? '0' + M : M;
		var D = nowDate.getDate();
		var d = nowDate.getDay();
		var min = '';
		var max = '';
		var getTime = function(subNum) {
			return new Date(Y + '/' + M + '/' + D + ' 00:00:00').getTime() + subNum * 1000 * 24 * 3600;
		}
		switch(d) {
			case 0:
				max = getTime(1);
				min = getTime(-7);
				break;
			case 1:
				max = getTime(7);
				min = getTime(0);
				break;
			case 2:
				max = getTime(6);
				min = getTime(-1);
				break;
			case 3:
				max = getTime(5);
				min = getTime(-2);
				break;
			case 4:
				max = getTime(4);
				min = getTime(-3);
				break;
			case 5:
				max = getTime(3);
				min = getTime(-4);
				break;
			case 6:
				max = getTime(2);
				min = getTime(-5);
				break;
		}
		if(date > min && date < max) {
			return true
		} else {
			return false;
		}
	}

	/**
	 * 获取日期对应的数据 筛分 年 月 日 周
	 * @param data 存储的所有数据 返回一个组数
	 * @return {Y, M, D, d}
	 **/
	utils.getDateData = function(data, type) {
		//获取
		var now = this.getTime(new Date().getTime());
		var obj = {
			in: [],
			out: [],
			Y: { in: [],
				out: []
			},
			M: { in: [],
				out: []
			},
			D: { in: [],
				out: []
			},
			d: { in: [],
				out: []
			}
		};

		for(var i = 0; i < data.length; i++) {
			var dataTime = this.getTime(data[i].time);
			
			if(data[i].bf_type === 'in'){
				obj.in.push(data[i])
			}else if(data[i].bf_type === 'out'){
				obj.out.push(data[i])
			}
			
			//年
			if(now.Y === dataTime.Y) {
				if(data[i].bf_type === 'out'){
					obj.Y.out.push(data[i]);
				}else if(data[i].bf_type === 'in'){
					obj.Y.in.push(data[i]);
				}				
			}
			
			//月
			if(now.Y === dataTime.Y && now.M === dataTime.M) {
				if(data[i].bf_type === 'out'){
					obj.M.out.push(data[i]);
				}else if(data[i].bf_type === 'in'){
					obj.M.in.push(data[i]);
				}	
			}
			
			//日
			if(now.Y === dataTime.Y && now.M === dataTime.M && now.D === dataTime.D) {
				if(data[i].bf_type === 'out'){
					obj.D.out.push(data[i]);
				}else if(data[i].bf_type === 'in'){
					obj.D.in.push(data[i]);
				}	
			}
			
			//周
			if(this.hasDate(data[i].time)) {
				if(data[i].bf_type === 'out'){
					obj.d.out.push(data[i]);
				}else if(data[i].bf_type === 'in'){
					obj.d.in.push(data[i]);
				}	
			}
		}
		return obj;
	}
	//扩展Vue
	Vue.$utils = utils;
}