export function checkPC(){
    if(navigator.userAgent){
        return ()=>{import App from '../src/App.vue'}
    }
    else{
        return ()=>{import App from '../src/App_mobile.vue'}
    }
}