<template>

    <!-- slide -->
    <div class="mySlide container-fluid">
        <div class="row">
            <div class="col-12 m-0 p-0">
                <img class="w-100" src="@/assets/img/doraemo_bg_11.png">
            </div>
        </div>
    </div>
    <!--content-->
    <div class="myContent container" style="z-index:10">
        <div class=" row p-5 mb-n3">
            <div class=" col-12 justify-content-center d-flex ">
                <span class="font-weight-bold">精彩视频</span>
            </div>
            <div class="mt-2 mb-4 col-12 justify-content-center d-flex ">
                <span class="font-weight-bold text-primary">——</span>
            </div>
            <div class=" col-12 ">
                <div class=" pt-3 pb-3 row border-bottom border-top align-items-center ">
                    <template v-for="play, index in playData" :key="index">
                        <div
                            class="col-12 col-md-6 mt-md-2 mr-n3 videoCol justify-content-center align-items-center d-flex ">
                            <div class="videoBox">
                                <video controls="true" class=" w-100 " preload="metadata">
                                    <source :src="play.url" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <!--slogan-->
    <div class=" container-fluid">
        <div class=" row mb-5">
            <div class=" col-12 d-flex flex-column align-items-center ">
                <h6 style="font-family:站酷小薇LOGO体,sans-serif">&copy;哆啦A梦</h6>
                <p class="slogan" style="font-family:站酷小薇LOGO体,sans-serif">
                    童年那个怕老鼠爱吃铜锣烧的蓝色机器猫 现在还有看吗?
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    name: 'playView',
    data() {
        return {
            playData: [
                { url: 'http://124.71.107.26:8989/media/video/video1.mp4' },
                { url: 'http://124.71.107.26:8989/media/video/video2.mp4' },
                { url: 'http://124.71.107.26:8989/media/video/video3.mp4' },
            ]
        }
    },
    computed: {
        ...mapGetters(["getAddress"]),
    }
}
</script>