<template>
  <!--header-->
  <HeaderView></HeaderView>
  <!-- <keep-alive> -->
  <router-view />
  <!-- </keep-alive> -->
  <FooterView></FooterView>
  <CustomCursor></CustomCursor>

</template>
<script>
import HeaderView from "@/components/HeaderView"
import FooterView from "@/components/FooterView"
import CustomCursor from "@/components/CustomCursor"
export default {
  name: 'app',
  data() {
    return {

    }
  },
  mounted() {
    // 监听右击事件
    document.addEventListener('contextmenu', this.handleRightClick);
    // 监听键盘按下事件
    document.addEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleRightClick(event) {
      // 阻止右击的默认行为
      event.preventDefault();
    },
    handleKeyDown(event) {
      // console.log("键",event.key,"码",event.keyCode);
      // 阻止按下F12键的默认行为
      if (event.keyCode === 123 || event.key === "F12") {
        event.preventDefault();
      }
    },
  },
  components: {
    FooterView,
    HeaderView,
    CustomCursor
  },
  beforeUnmount() {
    //销毁前移除监听器
    document.removeEventListener('contextmenu', this.handleRightClick)
    document.removeEventListener('keydown', this.handleKeyDown)
  }
}
</script>
<style>
*{
  /*cursor:url("./assets/img/doraemon.png") atuo !important;*/
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
  /*border: 1px solid red;*/
  font-family: "站酷小薇LOGO体", "方正少儿_GBK", serif;
  cursor:    none !important;
  /*opacity:1;*/
  /*transition:opacity 1s 0s ease;*/
    /*url(/doraemon/img/cursor/sword.cur), */
}

img {
  -webkit-user-select: none;
  /* Safari 3.1+ */
  -moz-user-select: none;
  /* Firefox 2+ */
  -ms-user-select: none;
  /* IE 10+ */
  user-select: none;
  /* 标准语法 */
}

html {
  --theme-normal: lightblue;
  --theme-night: gray;
}

body {
  min-width: 280px;
  overflow-x: hidden;
  overflow-y: scroll;

  /*overflow: overlay;*/
}

/*.myContent *{
  opacity:0.5;
   transform:scale(0.9);
  //transition:transform 1s 0s ease-in;
  }
  */

html {
  font-size: 16px;
}

div.mySlide {
  overflow: hidden;
}

.cursor-pointer {
  cursor: pointer;
}


@font-face {
  font-family: "方正少儿_GBK";
  src: url("@/assets/font/1_GBK.ttf");
}

@font-face {
  font-family: "站酷小薇LOGO体";
  src: url("@/assets/font/2_logo.otf");
}

::selection {
  background-color: lightblue;
}

span[class~=text-primary] {
  font-family: sans-serif;
}

* a,
* span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

::-webkit-scrollbar {
  /*background-color: transparent;*/
  position: absolute;
}


::-webkit-scrollbar-button {
  /*background-color: red;*/
}

::-webkit-scrollbar-track {
  /*background-color: transparent;*/
  background-color: pink;
}

::-webkit-scrollbar-corner {
  /*background-color: yellow;*/
}

::-webkit-scrollbar-track-piece {
  /*background-color: transparent;*/
}

::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background-color: rgba(135, 206, 250, 0.5);
}

div.myContent a {
  color: lightcoral;
}

div.myContent a:hover {
  color: deeppink;
}


a[class="information small"] {
  color: gray !important;
  text-decoration: none;
}
</style>