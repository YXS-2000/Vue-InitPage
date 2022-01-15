<template>
<div class="bg" :style="bgstyle">
    <!--show setting(to show statement) zone-->
    <div class="show-state"
        @click="bindShowState"
        :class="{'show-state-selected': showState}">
        <img class="show-state-img" 
            src="../assets/icon/stateBook.png"/>
    </div>
    <StatePage :ShowState="showState" />
    <div class="container">
        <!--show time zone-->
        <div class="title-img" 
            v-if="currentShow != 3"
            @click="bindCheckMode">
            {{time}}
        </div>
        <div class="input-zone-transition" 
            v-if="currentShow === 1">
            <!--show input zone-->
            <div class="input-zone" v-if="currentShow === 1">
                <div class="show-input-container">
                    <input class="info-input" 
                        v-model="search" 
                        @keyup.enter="clickToSearch"/>
                    <div class="show-search">
                        <img class="show-search-icon" @click="clickToSearch" src="../assets/search.png" />
                    </div>
                </div>
                <div class="show-browser-type-icon" 
                    @click="hidShowType">
                    <img class="show-search-icon" 
                        v-if="!hiddenType" 
                        :alt="typeValue[typeBrowserIcon]" 
                        :src="require('../assets/'+typeBrowserIcon+'.png')" />
                    <img class="show-search-icon" 
                        v-else
                        src="../assets/delete.png" />
                </div>
            </div>
            <!--show what kind of browser you want to use-->
            <div class="show-detail-type-container"
                :class="{showDetailType: hiddenType}"
                v-if="currentShow === 1">
                <div class="show-icon-zone">
                    <div class="show-detail-type-icon"
                        :class="{'show-detail-type-icon-selected': typeBrowserIcon === 'biying'}"
                        v-if="hiddenTypeTmp"
                        @click="bindClick('biying')"
                        style="animation-delay: 0s;">
                        <img class="show-icon" src="../assets/biying.png">
                    </div>
                </div>
                <div class="show-icon-zone">
                    <div class="show-detail-type-icon"
                        :class="{'show-detail-type-icon-selected': typeBrowserIcon === 'google'}"
                        v-if="hiddenTypeTmp"
                        @click="bindClick('google')"
                        style="animation-delay: 0.1s;">
                        <img class="show-icon" src="../assets/google.png">
                    </div>
                </div>
                <div class="show-icon-zone">
                    <div class="show-detail-type-icon"
                        :class="{'show-detail-type-icon-selected': typeBrowserIcon === 'baidu'}"
                        v-if="hiddenTypeTmp"
                        @click="bindClick('baidu')"
                        style="animation-delay: 0.2s;">
                        <img class="show-icon" src="../assets/baidu.png">
                    </div>
                </div>
            </div>
        </div>
        <SettingPage v-if="currentShow === 2"/>
    </div>
</div>
</template>

<script>
//设置推荐按键
import SettingPage from './setting_page.vue'
//设置说明书
import StatePage from './state.vue'

export default {
    name: 'Startpage',
    components: {
        SettingPage,
        StatePage
    },
    data(){
        return {
            search : '',
            typeBrowserIcon: 'biying',
            hiddenType: false,
            hiddenTypeTmp: false,
            typeValue: {
                'biying': '必应',
                'google': '谷歌',
                'baidu': '百度'
            },
            time: '',
            showState: false,//展示说明书
            //页面模式，有1，2，3
            currentShow: 1,
            //简洁版防抖实现
            touchOrNot: true,
            bgstyle: ''
        }
    },
    created(){
        //获取时间，随机生成背景样式
        function getTime(){
            let date = new Date()
            let hour = date.getHours() + 1 < 10 ? '0' + date.getHours().toString() : date.getHours().toString()
            let minute = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()
            return hour + ':' + minute
        }
        //生成随机背景
        function getBgStyle(){
            let BgImg=[
                'background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);',
                'background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);',
                'background-image: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);',
                'background-color: #CDDCDC; background-image: radial-gradient(at 50% 100%, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(0,0,0,0.25) 100%); background-blend-mode: screen, overlay;',
                'background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);'
            ]
            //设置随机数
            let style = BgImg[Math.floor(Math.random()*(BgImg.length))]
            //console.log(style)
            return style
        }
        this.bgstyle = getBgStyle()
        //console.log(this.bgstyle)
        this.time = getTime()
        //console.log(this.time)
        this.settime = setInterval(()=>{
            this.time = getTime()
        },60000)
    },
    methods: {
        //Hid the icon which locates next to the input square.
        hidShowType: function(){
            if(this.touchOrNot === false){
                return ;//防抖实现
            }
            if(this.hiddenType === false){
                this.hiddenType = true
                this.hiddenTypeTmp = true
            }else{
                //让按键消失更加丝滑，同时保证下一次按键出场动画能够执行
                this.touchOrNot = false
                this.hiddenType = false
                setTimeout(()=>{
                    this.hiddenTypeTmp = false
                    this.touchOrNot = true
                },250)
            }
        },
        bindClick: function(res){
            this.typeBrowserIcon = res
        },
        clickToSearch: function(){
            //open other window
            let searchList = {
                'biying': 'https://cn.bing.com',
                'baidu': 'https://www.baidu.com',
                'google': 'https://www.google.com'
            }
            let searchUrl = {
                'biying': '/search?q=',
                'baidu': '/s?wd=',
                'google': '/search?q='
                //搜出来了，和必应一样
            }
            if(this.search === ''){
                window.open(searchList[this.typeBrowserIcon])
            }else{
                //安全起见，还是保证能把特殊字符转换成URI标准（base64）
                let code = window.encodeURIComponent(this.search)
                window.open(searchList[this.typeBrowserIcon] + searchUrl[this.typeBrowserIcon] + code)
            }
        },
        bindCheckMode: function(){
            this.currentShow === 1 ? this.currentShow = 2 : this.currentShow = 1
        },
        bindShowState: function(){
            this.showState = !this.showState
        }
    }
}
</script>

<style scoped>
/*change pages animation*/
@keyframes enter-page{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}

@keyframes leave-page {
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}

/*loading new font*/
@font-face {
    font-family: HarmonyOS;
    src: url('../assets/HarmonyOS_Sans_Light.ttf');
}

@font-face {
    font-family: title-font;
    src: url('../assets/basictitlefont-1.ttf');
}

@font-face {
    font-family: din;
    src: url('../assets/DIN-Regular-2.otf');
}

.bg{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
}
/*时间部分*/
.container {
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15vh;
    position: relative;
}

/*说明书部分组件*/
.show-state{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2vw;
    height: 2vw;
    border-radius: 100%;
    position: absolute;
    top: 1vw;
    right: 2vw;
    transition: all .25s ease;
    background-color: rgba(81, 81, 81, 0.4);
    cursor: pointer;
}

.show-state:hover,
.show-state-selected{
    background-color: #515151;
}

.show-state-img{
    object-fit: cover;
    width: 1.2vw;
    height: 1.2vw;
}

/**/

.title-img {
    user-select: none;
    cursor: default;
    display: flex;
    font-family: title-font;
    font-weight: bolder;
    font-size: 6vw;
    color: #515151;
    margin-bottom: 1vw;
}

.input-zone-transition{
    animation: enter-page .25s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateZ(0);
}

.input-zone {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    align-items: center;
}

.show-input-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .5vw;
    justify-content: space-between;
    border-radius: 10vw;
    background-color: rgb(205, 205, 205, 0.6);
}

.info-input {
    display: inherit;
    color: #515151;
    width: 20vw;
    height: 2vw;
    border: 0;
    text-align: center;
    background-color: rgb(205, 205, 205,0);
}

.info-input:focus {
    border: 0;
    outline: none;
}

.show-search {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2vw;
    height: 2vw;
    margin-left: 1.5vw;
    border-radius: 100%;
    transition: background-color ease .25s;
}

@keyframes show-delete {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1.0;
    }
}

.show-search-icon {
    animation: show-delete .25s ease;
    transform: translateZ(0);/*硬件加速*/
    display: flex;
    width: 1.2vw;
    height: 1.2vw;
    object-fit: cover;
}

.show-search:hover {
    background-color: rgba(175, 175, 175, 0.884);
}

.show-browser-type-icon {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5vw;
    height: 2.5vw;
    background-color: #515151;
    border-radius: 100%;
    margin-left: 1vw;
    visibility: visible;
    transition: all ease .25s;
}

.show-browser-type-icon:hover{
    opacity: 0.5;
}

.showHidden {
    visibility: hidden;
    opacity: 0;
}

.show-detail-type-container {
    display: flex;
    flex-direction: row;
    width: 25vw;
    height: 5vw;
    align-items: center;
    visibility: hidden;
    opacity: 0;
    justify-content: space-evenly;
    transition: all ease .25s;
}

.showDetailType {
    visibility: visible;
    opacity: 1;
}

.show-icon-zone {
    display: flex;
    width: 3.6vw;
    height: 3.6vw;
    justify-content: center;
    align-items: center;
}

@keyframes show-icon{
    0%{
        transform: translateX(20px);
        opacity: 0;
    }
    60%{
        transform: translateX(-10px);
    }
    100%{
        transform: translateX(0);
        opacity: 0.8;
    }
}

.show-detail-type-icon {
    cursor: pointer;
    animation: show-icon .4s ease forwards;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.2vw;
    height: 3.2vw;
    background-color: #aaa;
    border-radius: 100%;
    opacity: 0;
    transition: all ease .25s;
}

.show-detail-type-icon:hover,
.show-detail-type-icon:active, 
.show-detail-type-icon-selected{
    width: 3.6vw;
    height: 3.6vw;
    background-color: #515151;
}

.show-icon { 
    object-fit: cover;
    width: 1.2vw;
    height: 1.2vw;
}
</style>
