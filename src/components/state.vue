<template>
<transition name="show-contect-animation">
    <div class="show-contect-container"
        v-if="ShowState">
        <div class="show-headline">{{title}}</div>
        <div class="show-update-zone">
            <div class="show-update-number">{{showUpdate}}</div>
            <div class="show-update-type">{{showType}}</div>
        </div>
        <div class="show-contect">
            <div class="show-title" v-for="(item, index) of contect" :key="index">
                <div class="show-contect-title">{{item.title}}</div>
                <div class="show-contect-contect">{{item.contect}}</div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    name: 'state-page',
    props:{
        ShowState: Boolean
    },
    data(){
        return {
            //展示版本信息
            title: '起始页说明书',
            showUpdate: '1.0.3',
            showType: 'Beta',
            //说明书展示内容
            contect: [
                {
                    title: '更换搜索引擎',
                    contect: '点击搜索引擎类型图标，选择完毕后再次点击即可隐藏'
                },
                {
                    title: '更多功能',
                    contect: '点击时间即可查看'
                },
                
            ]
        }
    }
}
</script>

<style scoped>
@keyframes Im-coming{
    0%{
        transform: rotateX(-90deg);
        opacity: 0;
    }
    100%{
        transform: rotateX(0);
        opacity: 1;
    }
}

@keyframes Im-going {
    0%{
        transform: rotateX(0deg);
        opacity: 1;
    }
    100%{
        transform: rotateX(-90deg);
        opacity: 0;
    }
}

.show-contect-animation-enter-active{
    animation: Im-coming .25s ease-out;
}

.show-contect-animation-leave-active{
    animation: Im-going .15s ease-out;
}

.show-contect-container{
    display: flex;
    position: fixed;
    width: 30vw;
    height: 50vh;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    top: 3.2vw;
    right: 4.2vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateZ(0);
    z-index: 10;
}

.show-contect-going{
    animation: Im-going .25s ease-out;
}

.show-contect{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 28vw;
    height: 28vh;
    overflow: auto;
    overflow-x: hidden;
}

/*展示说明书标题*/

.show-headline{
    font-family: HarmonyOS;
    display: flex;
    text-align:left;
    width: 28vw;
    font-size: 1.6vw;
    color: #515151;
    font-weight: bold;
}

.show-update-zone{
    display: flex;
    flex-direction: row;
    width: 28vw;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 2vh;
}

.show-update-number{
    text-align: left;
    font-size: 1vw;
    color: #aaaaaa;
    margin-right: .4vw;
}

.show-update-type{
    text-align: center;
    padding: 0.1vw;
    font-size: 1vw;
    color: white;
    background-color: #aaaaaa;
    border-radius: .1vw;
}

.show-contect::-webkit-scrollbar{
    width: 3px;
    height: 3px;
    background-color: rgba(170, 170, 170, 0.4);
    border-radius: 6px;
}

.show-title{
    transform: translateZ(0);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2vh;
    margin-left: 3px;
}

.show-contect-title{
    display: flex;
    font-size: 1vw;
    font-weight: bold;
    width: 28vw;
    font-family: HarmonyOS;
    color: #515151;
    margin-bottom: .8vh;
}

.show-contect-contect{
    transform: translateZ(0);
    font-size: .8vw;
    font-family: HarmonyOS;
    white-space: normal;
    width: 28vw;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    color: #515151;
}
</style>