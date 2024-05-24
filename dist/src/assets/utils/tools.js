
/**
 * One
 * 传入的元素必须设置宽高，不然不显示
 * 用法:传入一个对象序列
 * 如果不生效请将初始化样式手动添加到行内style属性里面
 * USE:Pass in a list of objects
 * @name 划入显示
 * @augments elements
 * @return null
 * @param elements =[child,child,child,child,child]
 * @type Array | Object
 * @example displayOfCutIn(objectElements);
 */
function displayOfCutIn(elements) {
    //如果传入的不是一个元素列表，退出
    if (elements.length == null) {
        console.error(elements + "Is Not A List")
        return null;
    }
    //保存列表
    let div = elements;
    //获取父级
    let divParent =div[0].parentElement;
    //父类溢出隐藏，避免破坏布局
    if (divParent) {
        divParent.style.overflow = "hidden";
    }
    //滚动条
    let scroll;
    //父类空白
    let parentSpace;
    //父类头顶
    let parentTop;
    //初始化列表样式
    for (let i = 0; i < div.length; i++) {
        if (i % 2 === 0) {
            div[i].style.left = "-110%";
        } else {
            div[i].style.right = "-110%";
        }
    }
    setTimeout(()=>{
        div[0].style.opacity=1;
        div[0].style.left = 0;
    },500)
    window.onscroll = function () {
        // console.clear()
        scroll = document.body.scrollTop || document.documentElement.scrollTop;
        for (let divKey = 1; divKey < div.length; divKey++) {
            parentSpace = parseInt(divParent.style.padding);
            //当第一个元素的头相对父级为0,获取父级的头部高度
            if (div[divKey].offsetTop <= 0) {
                if (divParent) {
                    parentTop = divParent.offsetTop / 4;
                } else {
                    parentTop = 0;
                }
            } else {
                parentTop = 0;
            }
            //如果滚动条已滚动到元素的位置
            if (scroll >= parentTop + div[divKey].offsetTop - (div.length * 20) - (parentSpace ? parentSpace : 0)) {
                if (divKey % 2 === 0) {
                    div[divKey].style.left = "0";
                } else {
                    div[divKey].style.right = "0";
                }
                div[divKey].style.opacity = "1";
                //    提示
                /*                console.log("父类子类", div[divKey].parentElement.offsetTop + div[divKey].offsetTop - (div.length * 10) - (parentSpace ? parentSpace : 0))
                                console.log("滚动条", scroll);
                                console.log("元素Top", div[divKey].offsetTop)*/
            }else{
                div[divKey].style.opacity = "0";
                if (divKey % 2 === 0) {
                    div[divKey].style.left = "-110%";
                } else {
                    div[divKey].style.right = "-110%";
                }
            }
        }
    }
}

/**
 * Two
 * @name 触点
 * @return null
 * @example contactor();
 */
function contactor() {
	//创建一个盒子
    let cursor = document.createElement("div");
	//设置样式
    cursor.style.cssText = "pointer-events:none;width:13px;height:13px;background-color:lightblue;border-radius:50%;position:fixed;top:100px;left:100px;opacity:0;transform:translate(-50%,-50%);z-index:999;";
	//将盒子应用到页面上
    document.body.appendChild(cursor)
    document.body.addEventListener("touchstart", function (e) {
        cursor.style.opacity = "1";
        cursor.style.top = e.touches[0].clientY + "px";
        cursor.style.left = e.touches[0].clientX + "px";
    }, {passive: true})
    document.body.addEventListener("touchend", function () {
        cursor.style.opacity = "0";
    }, {passive: true})
    document.addEventListener("mousedown", function (e) {
        cursor.style.transition = "none";
        cursor.style.opacity = "1";
        cursor.style.top = e.clientY + "px";
        cursor.style.left = e.clientX + "px";
    })

    document.addEventListener("mouseup", function () {
        cursor.style.opacity = "0";
        cursor.style.transition = "opacity 1s 0s ease-out";
    })
}


// customCursorPlugin.js
/**
 * @name 爱心鼠标
 * @example CustomCursorPlugin.init()
 */
const CustomCursorPlugin = {
    cursorElement: null,
    cursorColor: 'pink',
   style: '',
    init(color) {
     this.cursorColor = color;
      this.createCursor();
      this.setupMouseMoveListener();
      setInterval(() => {
        this.cursorColor = this.updateCursorColor();
      }, 1000);
      this.addCursorStyle();
    },
  
    setupMouseMoveListener() {
      document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    },
  
    handleMouseMove(event) {
      this.cursorElement.style.left = event.clientX + 'px';
      this.cursorElement.style.top = event.clientY + 'px';
    },
  
    updateCursorColor() {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      return randomColor;
    },
  
    createCursor() {
      this.cursorElement = document.createElement('div');
      this.cursorElement.classList.add('custom-cursor');
      document.body.appendChild(this.cursorElement);
    },
  
    addCursorStyle() {
    const style = document.createElement('style');
    style.innerHTML = `
        .custom-cursor {
          width: 24px;
          height: 24px;
          position: fixed;
          pointer-events: none;
          z-index: 99999;
          background-color: transparent;
        }
  
        .custom-cursor::before {
          content: '❤';
          font-size: 24px;
          position: absolute;
          top: 5px;
          left: 5px;
          transform: translate(-50%, -50%) rotate(135deg);
          color: ${this.cursorColor};
        }
      `;
      document.head.appendChild(style);
    },
  };
  
  
  // 导出插件对象
export default{
    displayOfCutIn,
    contactor,
    CustomCursorPlugin
}

