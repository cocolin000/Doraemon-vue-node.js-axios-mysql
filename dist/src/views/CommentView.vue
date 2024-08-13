<template>
    <div class="container">
        <div class="row com">
            <div class="title col-12">评论</div>
            <div class="form col-12">
                <!-- <input type="text" class="form-control" placeholder="输入评论（Enter换行）"> -->
                <div ref="inputSrc" @keydown.ctrl.enter="subComment" class="input" contenteditable="true">
                </div>
                <div class="action-box">
                    <span><i class="fa fa-smile-o small"></i>表情</span>
                    <button class="btn btn-info" :class="{ 'invisible': isNull }" @click="subComment">发表评论</button>
                </div>
            </div>
            <div class="title col-12">全部评论</div>
        </div>
        <div class="row comment">
            <template v-for="comment, index in comments" :key="index">
                <div class="all col-12">
                    <div class="portrait">
                        <img :src="comment.portrait ?? defaultePortrait" class="img-fluid">
                    </div>
                    <div class="main">
                        <div class="user-info">
                            <span class="name">{{ comment.name }}</span>
                            <time class="time">{{ $formatTime(comment.time) }}</time>
                        </div>
                        <div class="text">
                            {{ comment.comment }}
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/assets/utils/request'
export default {
    name: "commentView",
    data() {
        return {
            //默认名字
            defaultName: '蓝胖子',
            // 默认头像
<<<<<<< HEAD
            defaultePortrait: "http://124.71.107.26:8989/media/img/doraemon_logo.png",
            // 评论列表
            comments: [
                { name: "大雄", time: Date.now(), comment: "长风破浪会有时,直挂云帆济沧海", portrait: "http://124.71.107.26:8989/media/img/person/dx.png" },
=======
            defaultePortrait: "http://localhost:8989/media/img/doraemon_logo.png",
            // 评论列表
            comments: [
                { name: "大雄", time: Date.now(), comment: "长风破浪会有时,直挂云帆济沧海", portrait: "http://localhost:8989/media/img/person/dx.png" },
>>>>>>> 4519c79dfb85893d0565eabc8fe3a368b8e02c58
            ],
            comment: null,
            // 用户输入
            strData: "",
            // 输入是否为空
            isNull: true,
            page: 100,
            ws: [],
            wstt: ["123"],
        }
    },
    watch: {
        strData() {
            if (this.strData == "")
                this.isNull = true;
            else {
                this.isNull = false;
            }
        },
        immediate: true
    },
    methods: {
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        inputSrc() {
            const el = this.$refs.inputSrc;
            this.strData = el.textContent;
        },
        subComment() {
            if (this.strData == "") {
                console.error("Please enter a comment")
                return false;
            }
            // 组装comment
            const on = this.$store.getters.getUser;
            this.comment = {
                name: on.name || this.defaultName,
                time: Date.now(),
                comment: this.strData,
                portrait: this.defaultePortrait,
            }
            //添加comment
            this.comments.unshift(this.comment);
            // 保存评论
            axiosInstance.post('/addComment', {
                uid: on.uid,//用户id
                comment: this.strData,//评论
                name: on.name || this.defaultName,//用户名
                time: Date.now(),//时间戳
            }).then(() => {
                console.clear();
                console.log('发送成功')
            }).catch(error => {
                console.log(error.message)
            });
            //ws发送消息
            this.ws.send(JSON.stringify(this.comment))
            //清空comment
            this.strData = '';
            this.$refs.inputSrc.textContent = '';
            // 失去焦点
            this.$refs.inputSrc.blur();
        }
    },
    mounted() {
        // 创建web socket 
<<<<<<< HEAD
        this.ws = new WebSocket('ws://124.71.107.26:8989/');
=======
        this.ws = new WebSocket('ws://localhost:8989/');
>>>>>>> 4519c79dfb85893d0565eabc8fe3a368b8e02c58
        this.ws.onopen = () => {
            console.log('connection established');

            // 在连接建立后发送消息
            //   this.ws.send('Hello, server!我是1个');
        };

        this.ws.onerror = function (error) {
            console.error('connection error:', error);
        };

        //收到数据
        this.ws.onmessage = (event) => {
            //   console.log('Received message from server:', event.data);
            try {
                this.comments.unshift(JSON.parse(event.data));
            } catch (e) {
                console.error('Error parsing JSON', e.message);
            }
        };

        this.ws.onclose = function () {
            console.log('connection closed:');
        };
        const el = this.$refs.inputSrc;
        el.addEventListener('input', this.inputSrc);
        axiosInstance.get('/queryAll')
            .then(response => {
                this.comments = response.data.data == "" ? this.comments : response.data.data
                // console.log(this.comments)
            }).catch(error => {
                console.log(error.message)
            })
    },
    beforeUnmount() {
        this.$refs.inputSrc.removeEventListener('input', this.inputSrc);
    }
}
</script>

<style scoped lang="scss">
.container {
    box-sizing: border-box;
    position: relative;
    top: 100px;
    padding: 100px;
    overflow: none;
    background-color: #e4e4e4;

    & *:not(.fa) {
        font-family: "方正少儿_GBK";
    }

    .comment {
        background-color: var(--theme-normal);
        max-height: 65vh;
        overflow: auto;
        /*标题样式*/
    }

    div.com {
        background-color: var(--theme-normal);

        .title {

            border-bottom: 1px solid aliceblue;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            padding-bottom: 3px;
        }

        /*输入框*/
        div.form {
            height: 100%;

            /*内容*/
            div.input {
                position: relative;
                min-height: rem;
                background-color: white;
                padding: 1rem;

                /*提示*/
                &::before {
                    content: "输入评论（Enter换行，Ctrl + Enter发送）"
                }

                /*获取焦点修改样式*/
                &:focus {
                    background-color: black;
                    color: var(--theme-normal);

                    /* &+div.action-box {
                        opacity: 1;
                        display: flex;
                    }*/

                    /*隐藏提示*/
                    &::before {
                        display: none
                    }
                }
            }

            /*tools*/
            div.action-box {
                display: flex;
                margin-top: 0.5rem;
                justify-content: space-between;
                transition: opacity 400ms ease-in-out;
            }
        }
    }
}

/*所有评论*/
.all {
    display: flex;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 5px;

    /*头像*/
    .portrait {
        padding-right: 10px;
        overflow: hidden;

        img {
            width: 40px;
            height: 40px;
            border-radius: 25%;
        }
    }

    /*信息*/
    .main {
        width: 100%;

        /*用户信息*/
        div.user-info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            /*用户名*/
            span.name {

                font-size: smaller;
            }

            /*评论时间*/
            time.time {}
        }

        /*评论*/
        div.text {
            padding: 10px 0;

        }
    }
}
</style>