if(Vue) {
	//该组件页 必须与anyi-ui.css 配合使用
	/**
	 * anyi-page-header
	 * 移动端页面头部
	 * @props title 设置头部标题
	 * */
	Vue.component('anyi-page-header', {
		name: 'AnyiPageHeader',
		componentName: 'AnyiPageHeader',
		functional: true,
		render: function(createElement, context) {
			return createElement('header', {
				class: {
					'anyi-fixed-header': true
				}
			}, [
				context.slots()['page-header-left'],
				createElement('h1', {
					class: {
						'anyi-fixed-header-title': true
					}
				}, context.props.title),
				context.slots()['page-header-right']
			])
		},
		props: {
			title: String
		}
	})

	/**
	 * anyi-page-header-left
	 * 头部左边组件
	 * @props color 指定文字顏色
	 * */
	Vue.component('anyi-page-header-left', {
		name: 'AnyiPageHeaderLeft',
		componentName: 'AnyiPageHeaderLeft',
		functional: true,
		render: function(createElement, context) {
			return createElement('div', {
				class: {
					'anyi-page-header-slot': true,
					'anyi-page-header-left': true
				},
				style: {
					color: context.props.color || '#666'
				},
				slot: 'page-header-left',
			}, context.slots().default)
		},
		props: {
			color: String
		}
	})

	/**
	 * anyi-page-header-right
	 * 头部右边组件
	 * @props color 指定文字顏色
	 * */
	Vue.component('anyi-page-header-right', {
		name: 'AnyiPageHeaderRight',
		componentName: 'AnyiPageHeaderRight',
		functional: true,
		render: function(createElement, context) {
			return createElement('div', {
				class: {
					'anyi-page-header-slot': true,
					'anyi-page-header-right': true
				},
				style: {
					color: context.props.color || '#666'
				},
				slot: 'page-header-right',
			}, context.slots().default)
		},
		props: {
			color: String
		}
	})

	/**
	 * anyi-page-footer
	 * 移动端页面底部tabbar
	 **/
	Vue.component('anyi-page-footer', {
		name: 'AnyiPageFooter',
		componentName: 'AnyiPageFooter',
		functional: true,
		render: function(createElement, context) {
			return createElement('nav', {
				class: {
					'anyi-page-footer': true
				}
			}, context.slots()['page-footer-item'])
		}
	})

	/**
	 * anyi-page-footer-item
	 * 移动端底部tabbar icon 以及文字
	 * @props active 为 true 加载激活样式
	 * */
	Vue.component('anyi-page-footer-item', {
		name: 'AnyiPageFooterItem',
		componentName: 'AnyiPageFooterItem',
		functional: true,
		render: function(createElement, context) {
			return createElement('div', {
				class: {
					'anyi-page-footer-item': true,
					'anyi-page-footer-item-active': context.props.active
				},
				on: {
					click: context.listeners.click
				},
				slot: 'page-footer-item'
			}, context.slots().default)
		},
		props: {
			active: Boolean
		}
	})

	/**
	 * anyi-page-content
	 * 移动端内容页面 
	 * 
	 * */
	Vue.component('anyi-page-content', {
		name: 'AnyiPageContent',
		componentName: 'AnyiPageContent',
		functional: true,
		render: function(createElement, context) {
			//校验页面是否有头部组件和底部组件
			var isHeader = false,
				isFooter = false;
			if(context.parent && context.parent.$el && context.parent.$el.children) {
				for(var i = 0; i < context.parent.$el.children.length; i++) {
					var obj = context.parent.$el.children[i];
					if(obj.localName === 'anyi-page-header') {
						isHeader = true;
					} else if(obj.localName === 'anyi-page-footer') {
						isFooter = true;
					}
				}
			}
			return createElement('div', {
				class: {
					'anyi-page-content': true,
				},
				style: {
					'padding-top': context.props.header ? context.props.header : isHeader ? '44px' : '0px',
					'padding-bottom': context.props.footer ? context.props.footer : isFooter ? '50px' : '0px',
				}
			}, context.slots().default)
		},
		props: {
			header: String,
			footer: String
		}
	})

	/**
	 * loading 组件 icon
	 * anyi-loading-icon
	 * @props size //加载icon 的宽高
	 * @props loadingWidth //加载icon线条的宽度
	 * @props loadingColor //加载icon 线条的颜色
	 */
	Vue.component('anyi-loading-icon', {
		name: 'AnyiLoadingIcon',
		componentName: 'AnyiLoadingIcon',
		functional: true,
		render: function(createdElement, context) {
			return createdElement('span', {
				class: 'anyi-loading-icon',
				style: {
					height: context.props.size || '18px',
					width: context.props.size || '18px',
					background: 'transparent',
					'border-width': context.props.loadingWidth || '3px',
					'border-style': 'solid',
					'border-color': context.props.loadingColor || '#20a0ff',
					'border-bottom-color': 'transparent',
					'border-radius': '100%',
					margin: 'auto'
				},
				slot: 'loading-icon'
			})
		},
		props: {
			size: String,
			loadingWidth: String,
			loadingColor: String
		}
	})

	/**
	 * loading组件的文字
	 * @props text
	 * @props color
	 */
	Vue.component('anyi-loading-text', {
		name: 'AnyiLoadingText',
		componentName: 'AnyiLoadingText',
		functional: true,
		render: function(createElement, context) {
			return createElement('span', {
				class: 'anyi-loading-text',
				style: {
					margin: 'auto',
					color: context.props.color || '#333'
				},
				slot: 'loading-text'
			}, context.props.text || '正在加载...')
		},
		props: {
			text: String,
			color: String
		}
	})

	/**
	 * loading 组件
	 * anyi-loading
	 * @param text: String, xxx
	 * @param size: String, '18px'
	 * @param type: String, inline || wrap
	 * @param color: String, '#ff0000'
	 * @param loadingColor: String, '#ff0000'
	 * @param loadingWidth: String '40px'
	 */
	Vue.component('anyi-loading', {
		name: 'AnyiLoading',
		componentName: 'AnyiLoading',
		functional: true,
		render: function(createElement, context) {

			//查找是否有 两个子组件
			var loadingIcon = context.slots() && context.slots()['loading-icon'] || '';
			var loadingText = context.slots() && context.slots()['loading-text'] || '';

			/**
			 *检查 是否有 AnyiLoadingIcon AnyiLoadingText 组件
			 */
			var isChildren = function() {
				return loadingIcon || loadingText ? true : false;
			}

			/**
			 * type类型 控制文字是否换行显示
			 */
			var handlerType = function() {
				if(loadingText && context.props.type === 'wrap') {
					loadingIcon = createElement('div', {
						style: {
							'text-align': 'center',
							margin: 'auto',
							'margin-bottom': '10px'
						}
					}, [loadingIcon]);

					loadingText = createElement('div', {
						style: {
							'text-align': 'center',
							margin: 'auto'
						}
					}, [loadingText])
				}
			}

			/**
			 * 是否自动创建icon 和text
			 * 传入了icon子组件 或 text 就不自动创建
			 */
			if(!isChildren()) {
				loadingIcon = createElement('anyi-loading-icon', {
					props: {
						size: context.props.size,
						loadingWidth: context.props.loadingWidth,
						loadingColor: context.props.loadingColor
					}
				});
				loadingText = createElement('anyi-loading-text', {
					props: {
						text: context.props.text,
						color: context.props.color
					}
				});
			}

			/**
			 * 校验是否换行
			 */
			handlerType();

			return createElement('div', {
				class: 'anyi-loading'
			}, [loadingIcon, loadingText])
		},
		props: {
			text: String,
			size: String,
			type: String,
			color: String,
			loadingColor: String,
			loadingWidth: String
		}
	})

	/**
	 * anyi-button 
	 * 按钮组件
	 * @param type 按钮类型
	 * @param size 按钮大小
	 * @param loading 按钮是否处于加载状态
	 * @param loadConfig loading的配置项 配置内容 同 anyi-loading一致
	 */
	Vue.component('anyi-button', {
		name: 'AnyiButton',
		componentName: 'AnyiButton',
		functional: true,
		render: function(createElement, context) {
			var slotContent = context.children;
			if(context.props.loading) {
				slotContent = [
					createElement('anyi-loading', {
						props: {
							text: context.props.loadConfig && context.props.loadConfig.text || '正在加载',
							size: context.props.loadConfig && context.props.loadConfig.size || '16px',
							type: context.props.loadConfig && context.props.loadConfig.type || 'inline',
							color: context.props.loadConfig && context.props.loadConfig.color || '#fff',
							loadingColor: context.props.loadConfig && context.props.loadConfig.loadingColor || '#fff',
							loadingWidth: context.props.loadConfig && context.props.loadConfig.loadingWidth || '3px'
						}
					})
				]
			}
			return createElement('button', {
				class: {
					'anyi-button': true,
					'anyi-button-default': true,
					'anyi-button-text': context.props.type == 'text',
						'anyi-button-primary': context.props.type == 'primary',
						'anyi-button-large': context.props.size == 'large',
						'anyi-button-small': context.props.size == 'small',
						'anyi-button-mini': context.props.size == 'mini',
						'anyi-button-loading': context.props.loading
				},
				on: {
					click: context.props.loading ? function() {} : context.listeners.click
				}
			}, slotContent)
		},
		props: {
			type: String,
			size: String,
			loading: Boolean,
			loadConfig: Object
		}
	})

	/**
	 * anyi-radio 单选按钮组件
	 * @props name 原生name 属性
	 * @props disabled 是否禁用
	 * @props v-model 双向绑定的值
	 * @props label 单选按钮传递的值
	 */
	Vue.component('anyi-radio', {
		name: 'AnyiRadio',
		componentName: 'AnyiRadio',
		render: function(createElement) {
			return createElement('label', {
				class: {
					'anyi-radio': true,
					'is-disabled': this.disabled
				},
				on: {
					click: this.check
				}
			}, [
				createElement('span', {
					class: {
						'anyi-radio-input': true,
						'is-checked': this.isGroup ? this.label == this._radioGroup.value : this.value == this.label
					}
				}, [createElement('input', {
					class: {
						'anyi-radio-original': true,
					},
					attrs: {
						type: 'radio',
						disabled: this.disabled,
						name: this.name,
						value: this.label
					}
				})]),
				createElement('span', {
					class: {
						'anyi-radio-label': true
					}
				}, this.$slots.default)
			])
		},
		props: {
			name: String, //radio原生那么属性
			disabled: {
				type: Boolean,
				default: false
			},
			label: [Number, String],
			value: [Number, String]
		},
		computed: {
			//检查组件外部是不由包裹组件
			isGroup: function() {
				var parent = this.$parent;
				while(parent) {
					if(parent.$options.componentName !== 'AnyiRadioGroup') {
						parent = parent.$parent;
					} else {
						this._radioGroup = parent;
						return true;
					}
				}
				return false;
			},
		},
		//改变model通讯方式 prop 传送的值 event 传送的事件{prop, event}
		model: {
			event: 'input'
		},
		beforeMount: function() {
			//将父组件的值 赋值给自己
			if(this.isGroup) this.value = this._radioGroup.value;
		},
		methods: {
			check: function() {
				if(this.disabled) {
					return
				};
				//由包裹组件 传值给包裹组件
				if(this.isGroup) {
					this.value = this.label;
					this._radioGroup.$emit('input', this.label);
				} else {
					this.$emit('input', this.label);
				}
			}
		}
	});

	/**
	 * 单选按钮组 anyi-radio-group 
	 * @props v-model 绑定的数据
	 * @v-on change  change 事件
	 */
	Vue.component('anyi-radio-group', {
		name: 'AnyiRadioGroup',
		componentName: 'AnyiRadioGroup',
		render: function(createElement) {
			return createElement('div', {
				class: 'anyi-radio-group'
			}, this.$slots.default)
		},
		props: {
			value: [Number, String],
		},
		model: {
			event: 'input'
		},
		watch: {
			value: function(value) {
				this.$emit('change', value)
			}
		}
	})

	/**
	 * switch 开关组件
	 */
	Vue.component('anyi-switch', {
		name: 'AnyiSwitch',
		componentName: 'AnyiSwitch',
		render: function(createElement) {
			return createElement('div', {
				class: {
					'anyi-switch': true,
					'anyi-switch-disabled': this.disabled
				},
				on: {
					click: this.switchChange
				}
			}, [
				createElement('span', {
					class: {
						'anyi-switch-bgc': true,
						'anyi-switch-is-checked': this.value,
							'anyi-switch-disabled': this.disabled
					}
				}, [
					createElement('input', {
						class: {
							'anyi-switch-input': true,
							'anyi-switch-disabled': this.disabled
						},
						attrs: {
							type: 'checkbox',
							value: this.value,
							checked: this.value,
							disabled: this.disabled
						}
					})
				]),
				createElement('span', {
					class: {
						'anyi-switch-button': true,
						'anyi-switch-is-checked': this.value,
							'anyi-switch-disabled': this.disabled
					},
				})
			])
		},
		props: {
			value: Boolean,
			disabled: Boolean
		},
		model: {
			event: 'switch'
		},
		watch: {
			value: function(value) {
				this.$emit('switch', value)
			}
		},
		methods: {
			switchChange: function() {
				if(this.disabled) return;
				this.value = !this.value;
				this.$emit('switch', this.value);
			}
		}
	})

	/**
	 * input 输入框组件
	 */
	Vue.component('anyi-input', {
		name: 'AnyiInput',
		componentName: 'AnyiInput',
		render: function(createElement) {
			var slotContent = [
				createElement('input', {
					class: {
						'anyi-input-input': true
					},
					attrs: {
						type: this.type,
						placeholder: this.placeholder,
						value: this.value
					},
					on: {
						input: this.change
					},
					directives: [{
						name: 'model',
						modifiers:{
							price:true
						}
					}]
				})
			];
			//设置label 标题后 动态创建输入框标题
			if(this.label) {
				var _self = this;
				var getLabel = function() {
					return createElement('span', {
						class: {
							'anyi-input-label': true
						},
						style: {
							width: _self.labelWidth || '80px',
							'text-align': _self.labelPosition || 'left'
						}
					}, _self.label)
				}
				slotContent.unshift(
					getLabel()
				);
			};
			return createElement('label', {
				class: {
					'anyi-input': true
				},
				style: {
					'padding-left': this.labelWidth ? this.labelWidth : '80px',
					'border-bottom': this.border ? '1px solid #d0d0d0' : '',
				}
			}, slotContent)
		},
		props: {
			value: String, //v-model 双向绑定
			type: String,
			border: Boolean,
			label: String,
			labelWidth: String,
			labelPosition: String,
			placeholder: String,
		},
		model: {
			event: 'input'
		},
		watch: {
			value: function(value) {
				this.$emit('change', value);
			}
		},
		methods: {
			change: function(e) {
				this.$emit('input', e.target.value);
			}
		}
	})

	/**
	 * anyi-card
	 * 卡片组件
	 */
	Vue.component('anyi-card', {
		name: 'AnyiCard',
		componentName: 'AnyiCard',
		functional: true,
		render: function(createElement, context) {
			var cardHeader = context.slots() && context.slots()['card-header'] || '';
			var cardBody = context.slots() && context.slots()['card-body'] || '';
			var cardFooter = context.slots() && context.slots()['card-footer'] || '';
			return createElement('div', {
				class: 'anyi-card'
			}, [cardHeader, cardBody, cardFooter])
		}
	})

	/**
	 * anyi-card-header
	 * 卡片組件-头部组件
	 * @props title 头部标题
	 */
	Vue.component('anyi-card-header', {
		name: 'AnyiCardHeader',
		componentName: 'AnyiCardHeader',
		functional: true, //声明无状态组件
		render: function(createElement, context) {
			return createElement('div', {
				class: 'anyi-card-header',
				slot: 'card-header'
			}, context.props.title || context.children) //分发参数的内容
		},
		props: {
			title: String,
		}
	})

	/**
	 * anyi-card-body
	 * 卡片組件-主体组件
	 */
	Vue.component('anyi-card-body', {
		name: 'AnyiCardBody',
		componentName: 'AnyiCardBody',
		functional: true, //声明无状态组件
		render: function(createElement, context) {
			return createElement('div', {
				class: 'anyi-card-body',
				slot: 'card-body'
			}, context.children) //分发所有的子元素
		}
	});

	/**
	 * anyi-card-footer
	 * 卡片組件-底部组件
	 */
	Vue.component('anyi-card-footer', {
		name: 'AnyiCardFooter',
		componentName: 'AnyiCardFooter',
		functional: true, //声明无状态组件
		render: function(createElement, context) {
			return createElement('div', {
				class: 'anyi-card-footer',
				slot: 'card-footer'
			}, context.children)
		}
	})

} else {
	throw new Error('Vue is not defined')
}