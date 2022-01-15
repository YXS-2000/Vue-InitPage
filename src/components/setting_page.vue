<template>
<div class="setting-container">
    <div class="show-title">推荐</div>
    <div class="setting-list">
        <div class="setting-icon" 
            :class="{'show-setting-l': currentLf === index}"
            v-for="(item, index) of urlList" 
            :key="index"
            @click="clickToGo(index)"
            @mouseleave="bindmouseLf(index)">
            <img class="show-setting-icon show-setting-icon-up" 
                :class="{'show-setting-icon-l': currentLf === index}"
                :src="require('../assets/icon/'+item.icon+'.png')" />
        </div>
    </div>
</div>
</template>

<script>
    //改组件为设置样式组件    
    export default {
        name: 'settingPage',
        data(){
            return {
                urlList: [
                    {
                        url: 'https://www.bilibili.com',
                        icon: 'bilibili'
                    },
                    {
                        url: 'https://mail.qq.com',
                        icon: 'QQyouxiang'
                    },
                    {
                        url: 'https://www.youku.com',
                        icon: 'youku'
                    },
                    {
                        url: 'https://www.weibo.com',
                        icon: 'weibo'
                    }
                ],
                currentLf: -1
            }
        },
        methods:{
            clickToGo(res){
                window.open(this.urlList[res].url)
            },
            bindmouseLf(res){
                this.currentLf = +res
            }
        }
    }
</script>

<style scoped>
/*just use the animation to make some ui come true*/
@keyframes up{
    0%{
        transform: translateY(0) scale(0.8);
        opacity: 0.8;
    }
    100%{
        transform: translateY(-0.4vw) scale(0.8);
        opacity: 1;
    }
}

@keyframes up-after{
    0%{
        transform: translateY(0);
    }
    50%{
        transform: translateY(-0.3vw);
    }
    100%{
        transform: translateY(0);
    }
}

@keyframes down-after{
    0%{
        transform: translateY(0);
    }
    50%{
        transform: translateY(0.3vw);
    }
    100%{
        transform: translateY(0);
    }
}

@keyframes down{
    0%{
        transform: translateY(-0.4vw) scale(0.8);
        opacity: 1;
    }
    100%{
        transform: translateY(0) scale(0.8);
        opacity: 0.8;
    }
}

@keyframes enter{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}

@font-face {
    font-family: HarmonyOS;
    src: url('../assets/HarmonyOS_Sans_Light.ttf');
}

.show-title{
    font-size: 2.2vw;
    transform: translateZ(0);
    color: #515151;
    margin-bottom: 0.1vw;
    font-family: HarmonyOS;
}

.setting-container{
    animation: enter .25s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateZ(0);
}

.setting-list{
    display: flex;
    flex-direction: row;
    padding: 0vw 1vw 0vw 1vw;
    max-width: 50vw;
}

.setting-icon{
    cursor: pointer;
    transform: scale(0.8);
    opacity: 0.8;
    width: 6vw;
    height: 6vw;
    border-radius: 100%;
    margin: 0 1vw 0 1vw;
    background-color: #515151;
    display: flex;
    justify-content: center;
    align-items: center;
}

.setting-icon:hover{
    animation: up .25s ease forwards;
}

.setting-icon:hover .show-setting-icon-up{
    animation: up-after .5s ease;
    animation-delay: .25s;
}

.show-setting-icon{
    width: 2vw;
    height: 2vw;
    object-fit: cover;
}

.show-setting-l{
    animation: down .25s ease forwards;
}

.show-setting-icon-l{
    animation: down-after .5s ease;
    animation-delay: .25s;
}
</style>
