<template>
    <div @wheel.prevent @touchmove.prevent class="container-fluid videoBox" ref="videoBox">
        <!-- embed-responsive  embed-responsive-16by9 -->
        <div ref='videoFlvBox' class="videoFlv embed-responsive  embed-responsive-16by9">
            <span @click="close" class="close">关闭</span>
            <video style="width: 100%;height:100%;" ref="video_Flv" :id="v_id">
                <source type="video/mp4" />
            </video>
            <div class="BTN" ref="videoControls" :style="btnstyle">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group mr-2" role="group" aria-label="First group">
                        <button type="button" @click="play" class="btn btn-secondary">播放</button>
                        <button type="button" @click="pause" class="btn btn-secondary">暂停</button>
                        <button type="button" @click="forward" class="btn btn-secondary">前进</button>
                        <button type="button" @click="back" class="btn btn-secondary">后退</button>
                    </div>
                    <div class="btn-group mr-2" role="group" aria-label="Second group">
                        <button type="button" @click="muted" class="btn btn-secondary">静音</button>
                        <div class="btn-group dropup" role="group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                                aria-expanded="false">
                                倍速
                            </button>
                            <div class="dropdown-menu bg-dark" @click="changeSpeed"
                                style="text-align:center;min-width: 100%;opacity:50%;padding:0 !important;margin:0 !important">
                                <button class="dropdown-item text-info small" value="1">1</button>
                                <button class="dropdown-item text-info small" value="1.5">1.5</button>
                                <button class="dropdown-item text-info small" value="2">2</button>
                                <button class="dropdown-item text-info small" value="3">3</button>
                                <button class="dropdown-item text-info small" value="5">5</button>
                            </div>
                        </div>
                        <!-- <button type="button" @click="speed" class="btn btn-secondary">倍速</button> -->
                        <button type="button" @click="fullScreen" class="btn btn-secondary">全屏</button>
                    </div>
                    <div class="btn-group" role="group" aria-label="Third group">
                        <button @click="download" class="btn btn-secondary">下载</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as flvjs from "flv.js"
export default {
    props: {
        // 视频
        videoSrc: {
            type: String,
            default: "http://localhost:8989/media/video/video2.mp4"
        },
        // id
        v_id: {
            type: String,
            default: "666",
        },
        v_title: {
            type: String,
            default: "666",
        }
    },
    data() {
        return {
            player: null,
            flvPlayer: null,
            seconds: 5,
            volume: 0,
            full: false,
            btnstyle: 'opacity:0',
            timer: null,
            mediaQuery: null,
        };
    },
    watch: {
        videoSrc() {
            // 处理函数，可以访问新旧值
            this.videoInit();
        },
        // 如果需要深度监听，则设置 deep 为 true
    },
    computed: {
        videoName() {
            return this.videoSrc.slice(this.videoSrc.lastIndexOf("/") + 1);
        }
    },
    mounted() {
        this.videoInit();
        window.addEventListener('orientationchange', this.handleOrientationChange);
        this.mediaQuery = window.matchMedia("(orientation: landscape)");
        this.mediaQuery.addListener(this.handleOrientationChange);
    },
    methods: {
        // 页面初始化
        videoInit() {
            if (flvjs.default.isSupported()) {
                // 获取dom对象
                this.player = this.$refs.video_Flv
                //创建flvjs对象
                this.flvPlayer = flvjs.default.createPlayer({
                    // 指定视频类型
                    type: "mp4",
                    //是否直播
                    isLive: true,
                    // 关闭声音
                    hasAudio: false,
                    // 开启跨域访问
                    cors: true,
                    // 指定流连接
                    url: this.videoSrc,
                });
                // 将flvjs对象和dom对象绑定
                this.flvPlayer.attachMediaElement(this.player);
                //加载视频
                this.flvPlayer.load();
                // 在播放之前添加延迟，或者在捕获错误时尝试重新播放
                setTimeout(() => {
                    this.flvPlayer.play().catch(error => {
                        console.error('播放视频时发生错误：', error);
                        // 在这里可以尝试重新播放或者采取其他适当的措施
                    });
                }, 1000);
                // 鼠标移动事件
                const videoControls = this.$refs.videoFlvBox;
                videoControls.addEventListener("mouseover", this.mouseOver);
                videoControls.addEventListener("mouseout", this.mouseOut);
            }
        },
        //销毁视频
        videoDestroy() {
            if (this.flvPlayer) {
                // 暂停视频播放
                if (!this.flvPlayer.paused && typeof this.flvPlayer.pause === 'function') {
                    this.flvPlayer.pause();
                }

                // 卸载视频资源
                if (typeof this.flvPlayer.unload === 'function') {
                    this.flvPlayer.unload();
                }

                // 卸载 DOM 对象
                if (typeof this.flvPlayer.detachMediaElement === 'function') {
                    this.flvPlayer.detachMediaElement();
                }

                // 销毁 flvjs 对象
                if (typeof this.flvPlayer.destroy === 'function') {
                    this.flvPlayer.destroy();
                }

                this.flvPlayer = null;
            }
        },
        //关闭
        close() {
            // 关闭窗口
            this.$emit('isVideo', false)
        },
        play() {
            this.flvPlayer.play();
        },
        pause() {
            this.flvPlayer.pause();
        },
        back() {
            this.flvPlayer.currentTime -= this.seconds;
        },
        forward() {
            this.flvPlayer.currentTime += this.seconds;
        },
        muted() {
            this.flvPlayer.volume = this.flvPlayer.volume ? 0 : 1
        },
        changeSpeed(event) {
            this.player.playbackRate = event.target.value
        },
        fullScreen() {
            const player = this.player
            if (!document.fullscreenElement) {
                // 进入全屏模式
                if (player.requestFullscreen) {
                    player.requestFullscreen();
                } else if (this.player.mozRequestFullScreen) { /* Firefox */
                    player.mozRequestFullScreen();
                } else if (this.player.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    player.webkitRequestFullscreen();
                } else if (this.player.msRequestFullscreen) { /* IE/Edge */
                    player.msRequestFullscreen();
                }
                // this.handleOrientationChange()
                //监听退出全屏模式
                document.addEventListener('fullscreenchange', this.exitHandler);
                document.addEventListener('mozfullscreenchange', this.exitHandler);
                document.addEventListener('webkitfullscreenchange', this.exitHandler);
                document.addEventListener('MSFullscreenChange', this.exitHandler);
                //鼠标样式
                player.style.setProperty('cursor', 'auto', 'important');
            }
            this.full = !this.full;
        },
        exitHandler() {

            const player = document.getElementsByTagName("video")[0];
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                // 退出全屏模式时执行的代码
                player.style.setProperty('cursor', 'none', 'important');
                this.full = false; // 根据你的逻辑修改
            }
        },
        download() {
            const a = document.createElement('a');
            a.setAttribute('href', this.videoSrc);
            a.setAttribute('download', this.videoName)
            a.click();
        },
        //鼠标移动
        mouseOver() {
            if (this.timer) clearTimeout(this.timer);
            this.btnstyle = `
                opacity:80%;
            `
        },
        mouseOut() {
            this.timer = setTimeout(() => {
                this.btnstyle = "opacity:0"
            }, 700);
        },
        //屏幕方向
        handleOrientationChange() {
            if (this.mediaQuery) {
                // 横屏模式
                console.log("横屏")
                // 执行相应操作，例如显示提示信息或者调整页面布局
            } else {
                console.log("书评")
                // 竖屏模式
                // 执行相应操作，例如隐藏提示信息或者恢复页面布局
                this.player.style.setProperty('cursor', 'auto', 'important');
                this.enterLandscapeMode()

            }
        },
        //切换横屏
        enterLandscapeMode() {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').then(() => {
                    console.log('已切换到横屏模式');
                    this.hideStatusBar();
                }).catch((error) => {
                    console.error('无法切换到横屏模式:', error);
                    // 提示用户设备不支持或者需要手动操作
                    alert('抱歉，您的设备不支持自动横屏，请手动调整方向。');
                });
            } else if (screen.lockOrientation) {
                try {
                    screen.lockOrientation('landscape');
                    console.log('已切换到横屏模式');
                    this.hideStatusBar();
                } catch (error) {
                    console.error('无法切换到横屏模式:', error);
                    // 提示用户设备不支持或者需要手动操作
                    alert('抱歉，您的设备不支持自动横屏，请手动调整方向。');
                }
            } else {
                // 提示用户设备不支持或者需要手动操作
                alert('抱歉，您的设备不支持自动横屏，请手动调整方向。');
            }
        },
        //隐藏状态栏
        hideStatusBar() {
            // 隐藏状态栏
            if (typeof window.Android !== 'undefined' && typeof window.Android.hideStatusBar === 'function') {
                // 如果是 Android 平台，调用 Android 提供的隐藏状态栏方法
                window.Android.hideStatusBar();
            } else if (typeof window.webkit !== 'undefined' && typeof window.webkit.messageHandlers !== 'undefined' && typeof window.webkit.messageHandlers.hideStatusBar !== 'undefined') {
                // 如果是 iOS 平台，调用 iOS 提供的隐藏状态栏方法
                window.webkit.messageHandlers.hideStatusBar.postMessage(null);
            } else {
                // 在其他情况下，你可能需要使用其他的方式隐藏状态栏，具体取决于你的应用程序的环境和需求
                console.warn('无法隐藏状态栏：不支持的平台或方法');
            }
        }
    },
    beforeUnmount() {
        //销毁视频
        this.videoDestroy();
        //卸载监听事件
        document.removeEventListener('fullscreenchange', this.exitHandler);
        document.removeEventListener('mozfullscreenchange', this.exitHandler);
        document.removeEventListener('webkitfullscreenchange', this.exitHandler);
        document.removeEventListener('MSFullscreenChange', this.exitHandler);
        document.removeEventListener('mouseover', this.mouseOver);
        document.removeEventListener('mouseout', this.mouseOut);
    },
    unMunted() {

    }
}
</script>

<style scoped>
.videoBox {
    width: 100%;
    height: 100%;
    background-color: rgba(173, 216, 230, 1);
    position: fixed;
    z-index: 1000;
    box-sizing: border-box;
}

.videoFlv {
    width: 60%;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.close {
    position: absolute;
    right: 0;
    top: 0;
    margin: 5px;
    z-index: 1000;
    font-size: 1rem;
}

.close:hover {
    background-color: rgba(e4e4e4, e4e4e4, e4e4e4, 1)
}

.videoFlv video {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

.BTN {
    position: relative;
    bottom: 0;
    display: flex;
    justify-content: center;
    opacity: 80%;
    transition: opacity 400ms ease-out;
}
</style>
