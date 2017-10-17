+function (Vue) {
    if (Vue) {
        //home 页面 公共头部
        Vue.component('my-header', {
            template: '<div class="my-header-home">' +
                            '<img class="my-header-home-img position-absolute-center" src="./images/common/cbd.jpg">'+
                            '<div class="my-header-home-wrap position-absolute-center">' +
                               '<div class="gross gross-income">' +
                                    '<div class="tit">' +
                                        '<span class="mui-icon iconfont icon-shouru"></span>' +
                                        '<span class="txt">总收入</span>' +
                                    '</div>'+
                                    '<div class="num">0.00</div>' +
                                '</div>' +
                                '<div class="gross gross-charge">' +
                                    '<div class="tit">' +
                                        '<span class="mui-icon iconfont icon-zhichu"></span>' +
                                        '<span class="txt">总支出</span>' +
                                    '</div>' +
                                    '<span class="num">0.00</span>' +
                                '</div>' +
                            '</div>' +
                            '<div class="total  position-absolute">' +
                                '<span class="mui-icon-extra mui-icon-extra-gold"></span>' +
                                '<span class="tit">结余</span>' +
                                '<span class="num">0.00</span>' +
                            '</div>' +
                        '</div>',
            props: {

            },
            data: function () {
                return {

                }
            },

        })

        //home 页面 列表组件
        Vue.component('my-home-item', {
            template: `<ul class="item-wrap" :style="wrapStyle">
                            <li class="item" v-for="item in listDatas"> 
                                <div class="title">
                                    <span class="mui-icon iconfont" :class="item.icon" style="font-size: 24px"></span>
                                    <span style="margin-left: 10px">{{item.title}}</span>
                                </div>
                                <div class="count display-flex-row-center">
                                    <div class="left display-flex-column-center">
                                        <div class="tit">
                                            <span class="mui-icon iconfont icon-shouru"></span>
                                            <span>收入</span>
                                        </div>
                                        <div class="num">
                                            0.00
                                        </div>
                                    </div>
                                    <div class="right display-flex-column-center">
                                        <div class="tit">
                                            <span class="mui-icon iconfont icon-zhichu"></span>
                                            <span>支出</span>
                                        </div>
                                        <div class="num">
                                            0.00
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>`,            
            data: function(){
                return {
                    listDatas: [
                        {title: '今日', icon: 'icon-ri'},
                        {title: '本周', icon: 'icon-xiao41'},
                        {title: '本月', icon: 'icon-yue'},
                        {title: '今年', icon: 'icon-nian'}
                    ],
                    wrapStyle: {
                        padding: 0,
                        margin: 0,
                        listStyle: 'none',
                        padding: '0 5px'
                    }
                }
            },
            mounted: function(){
            }

        })

    } else {
        throw new Error('Vue is not defined')
    }
}(Vue)