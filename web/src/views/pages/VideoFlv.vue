
<template>
    <div @wheel.prevent @touchmove.prevent class="container-fluid videoBox">
        <!-- embed-responsive  embed-responsive-16by9 -->
        <div class="videoFlv embed-responsive  embed-responsive-16by9">
            <span @click="close" class="close">关闭</span>
            <video style="width: 100%;height:100%;" controls autoplay muted ref="video_Flv" :id="v_id">
                <source type="video/mp4" />
            </video>
        </div>
        <div class="BTN">
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div class="btn-group mr-2" role="group" aria-label="First group">
                  <button type="button" class="btn btn-secondary">播放</button>
                  <button type="button" class="btn btn-secondary">暂停</button>
                  <button type="button" class="btn btn-secondary">前进</button>
                  <button type="button" class="btn btn-secondary">后退</button>
                </div>
                <div class="btn-group mr-2" role="group" aria-label="Second group">
                  <button type="button" class="btn btn-secondary">静音</button>
                  <button type="button" class="btn btn-secondary">倍速</button>
                  <button type="button" class="btn btn-secondary">7</button>
                </div>
                <div class="btn-group" role="group" aria-label="Third group">
                  <a download :href="videoSrc" class="btn btn-secondary">下载</a>
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
            default: "http://localhost:8080/media/video/video2.mp4"
        },
        // id
        v_id: {
            type: String,
            default: "666",
        },
    },
    data() {
        return {
            player: null,
            flvPlayer: null,
        };
    },
    watch: {
        videoSrc() {
            // 处理函数，可以访问新旧值
            this.videoInit();
        },
        // 如果需要深度监听，则设置 deep 为 true
    },
    mounted() {
        this.videoInit();
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
            }
        },
        //播放视频
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
        close() {
            // 关闭窗口
            this.$emit('isVideo', false)
        }
    },
    beforeUnmount() {
        this.videoDestroy();
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
}

.videoFlv {
    width: 60vw;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
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
</style>
