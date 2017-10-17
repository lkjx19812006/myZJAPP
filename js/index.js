var zj = zj || {}

zj.index = + function() {
	var aniShow = {}; //判断是否是首次显示
	var subPages = utils.config.subpages; //子页面

	//初始化页面  并添加子页面
	mui.plusReady(function() {
		var activePage = plus.webview.currentWebview(); //当前活动页面
		/**
		 * 首页初始化
		 * */
		var initIndex = function() {
			var _self = plus.webview.currentWebview();
			var temp = {};
			temp[_self.id] = 'true';
			mui.extend(aniShow, temp);
			//设置首页图标激活样式
			utils.updateIconView('tabBar1');
			var subpage_style = {
				top: '0px',
				bottom: '51px'
			};
			for(var i = 0; i < subPages.length; i++) {
				if(!plus.webview.getWebviewById(subPages[i])) {
					var sub = plus.webview.create(subPages[i], subPages[i], subpage_style);
					//初始化隐藏
					sub.hide();
					// append到当前父webview
					_self.append(sub);
				}
			}

		}

		/**
		 * tab 注册点击事件切换页面
		 * */
		var changeTab = function() {
			var _self = plus.webview.currentWebview();
			var tabBtns = _self.getSubNViews() //获取配置信息中的子页面数组
			var indexObj = {} //记录tabId
			for(var i = 0; i < 4; i++) {
				indexObj[tabBtns[i].id] = i;
				tabBtns[i].addEventListener('click', tabBtnClick, false)
			}
			//自定义tab事件
			function tabBtnClick(e) {
				var tabId = e.target.id;
				var targetView
				if(indexObj[tabId] > 0) {
					targetView = plus.webview.getWebviewById(subPages[indexObj[tabId] - 1]);
				} else {
					targetView = plus.webview.currentWebview();
				}

				if(targetView == activePage) {
					return
				}

				//底部选项卡切换
				utils.updateIconView(tabId);
				// 子页面切换
				changeSubpage(targetView, activePage);
				//更改当前活跃的页面
				activePage = targetView;

			}

		}
		/**	
		 * 点击切换tab窗口 
		 */
		var changeSubpage = function(targetView, activePage) {
			var timeOut = targetView === plus.webview.getLaunchWebview() ? 0 : 300;
			//若为iOS平台或非首次显示，则直接显示
			if(mui.os.ios || aniShow[targetView.id]) {
				plus.webview.show(targetView);
			} else {
				//否则，使用fade-in动画，且保存变量
				var temp = {};
				temp[targetView.id] = "true";
				mui.extend(aniShow, temp);
				plus.webview.show(targetView, "fade-in", 300);
			}
			//隐藏当前 除了第一个父窗口
			if(activePage !== plus.webview.getLaunchWebview()) {
				setTimeout(function() {
					plus.webview.hide(activePage);
				}, timeOut)
			}
		};
		initIndex();
		changeTab();
	})

}()