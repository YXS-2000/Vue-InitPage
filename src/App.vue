<template>
<div>
  <Startpage />
  <!--以下是底部解释文字，通过相对定位实现-->
  <footer class="show-footer">
    <img class="show-vue-icon" src="./assets/logo.png" />
    Designed by Yang Xiaosu
  </footer>
</div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Startpage from './components/start_page.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    Startpage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  position: relative;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

@font-face {
    font-family: title-font;
    src: url('./assets/basictitlefont-1.ttf');
}

body {
  margin: 0px;
  background-color: #cdcdcd;
}

.show-footer {
  font-family: title-font;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  font-size: 0.4vw;
  color: #515151;
  bottom: .2vh;
  font-weight: bold;
}

.show-vue-icon{
  display: flex;
  width: 0.6vw;
  height: 0.6vw;
  object-fit: cover;
  margin-right: .6vw;
}
</style>
