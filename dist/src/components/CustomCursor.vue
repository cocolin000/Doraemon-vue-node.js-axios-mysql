<template>
  <div class="custom-cursor" :style="cursorStyle"></div>
</template>

<script>
export default {
  name: 'customCursor',
  data() {
    return {
      cursorX: 0,
      cursorY: 0,
      cursorColor:'pink',
    };
  },
  computed:{
    cursorStyle(){
      return { 
        left: this.cursorX + 'px', 
        top: this.cursorY + 'px', 
        color: this.cursorColor, 
      }
    }
  },
  mounted() {
    this.setupMouseMoveListener();
    // setInterval(() => {
    //   this.cursorColor=this.updateCursorColor();
    // },1000)
  },
  methods: {
    setupMouseMoveListener() {
      document.addEventListener('mousemove', this.handleMouseMove);
    },
    handleMouseMove(event) {
      this.cursorX = event.clientX;
      this.cursorY = event.clientY;
    },
    updateCursorColor() {
      // 生成随机颜色
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      return randomColor;
    }
  }
};
</script>

<style scoped>
.custom-cursor {
  width: 24px;
  /* 光标宽度 */
  height: 24px;
  /* 光标高度 */
  position: fixed;
  /* 固定定位，使光标跟随鼠标移动 */
  pointer-events: none;
  /* 防止光标影响鼠标事件的传递 */
  z-index: 99999;
  /* 确保光标位于其他内容之上 */
  background-color: transparent;
  /* 透明背景 */
}

.custom-cursor::before {
  content: '❤';
  /* 使用❤字符代替红色圆形 */
  font-size: 24px;
  /* 字体大小与光标大小一致 */
  position: absolute;
  /* 绝对定位，相对于.custom-cursor */
  top: 5px;
  /* 使爱心垂直居中 */
  left: 5px;
  /* 使爱心水平居中 */
  transform: translate(-50%, -50%) rotate(135deg);
  text-shadow: 
    -1px -1px 0 #000,  
     1px -1px 0 #000,
    -1px  1px 0 #000,
     1px  1px 0 #000; /* 描边效果，可以根据需要调整偏移和颜色 */
}
</style>