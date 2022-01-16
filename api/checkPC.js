export async function checkPC(){
    //通过navigator实现文件动态导入
    if(navigator.userAgent){
        return ()=>import('../src/App.vue')
    }else{
        return ()=>import('../src/App_mobile.vue')
    }
}