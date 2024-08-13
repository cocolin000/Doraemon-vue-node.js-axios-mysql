<template>
    <VideoFlv :videoSrc="videoSrc" :v_title="v_title" :v_id="v_id" v-if="bofang" @isVideo="toggleVideo"></VideoFlv>
    <!-- <MyVideo  class="video"></MyVideo> -->
    <div class="mySlide container-fluid">
      <div class="row">
        <div class="col-12 m-0 p-0">
          <img class="w-100" src="@/assets/img/doraemo_bg_6.png">
        </div>
      </div>
    </div>
    <!--content-->
    <div class="myContent container" style="z-index: 10">
      <div class="row p-5">
        <div class="col-12 justify-content-center d-flex"><span class="font-weight-bold">剧场版</span></div>
        <div class="mt-2 mb-4 col-12 justify-content-center d-flex">
          <span class="font-weight-bold text-primary">——</span>
        </div>
        <!-- 电影信息容器 -->
        <div class="col-12">
          <div class="pt-3 pb-3 row border-bottom align-items-center">
            <!-- 电影信息 -->
            <template v-for="fdata, index in filmData" :key="index">
              <div class="col-xl-3 offset-xl-0 col-lg-3 offset-lg-1 col-md-4 col-sm-6 col-6 filmCol">
                <div class="film">
                  <img class="img-fluid" v-if="defaultAddress == ''" src="@/assets/img/poster.jpg" />
                  <img class="img-fluid" v-else :src="defaultAddress + fdata.fpath + fdata.fname" />
                  <div class="information" :title="fdata.title">
                    <h5 class="font-weight-bold filmName"><button class="play"
                        @click.prevent="playFilm(fdata.fname,fdata.title)">播放</button>{{ fdata.title }}</h5>
                    <p class="introduce">
                      {{ fdata.introduce }}
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// import MyVideo from "./pages/MyVideo.vue";
import VideoFlv from "./pages/VideoFlv.vue";
import axiosInstance from "@/assets/utils/request.js";
import { mapGetters } from "vuex";
export default {
  name: 'filmView',
  data() {
    return {
      //电影解析接口
      url: "https://search.bilibili.com/all?keyword=",
      // 电影信息
      filmData: [
        {
          // 标识
          fpath: "/src/assets/img/",
          // 名字
          title: "哆啦A梦：大熊的地球交响乐",
          // 封面
          fname: "poster.jpg",
          // 简介
          introduce: "加载中"
        }
      ],
      size: 8,
      staticData: [],
      //视频地址
      videoSrc: "",
      v_id: "aha",
      v_title:'aha',
    }
  },
  components: {
    VideoFlv
    // MyVideo
  },
  methods: {
    handleScroll() {
      const body = document.body;
      const html = document.documentElement;
      const windowHeight = window.innerHeight;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const scrollTop = window.pageYOffset || html.scrollTop || body.scrollTop;
      if (docHeight - windowHeight - scrollTop <= 1) {
        // 触发滚动到底部事件
        // 在这里可以触发你的自定义事件或执行相应的操作
        this.throttle(this.getFilms, 2000).call(this)
      }
    },
    // 修改viedo弹窗的状态
    toggleVideo(status) {
      // console.log(status)
      this.$store.dispatch('video/toggleIs', status);
    },
    // 获取视频
    getFilms() {
      axiosInstance.post('/media', {
        url: "/img/film/",
        size: this.size
      })
        .then(response => {
          setTimeout(() => {
            this.filmData = response.code == 300 ? this.filmData : response.data.data;
            this.staticData.push(this.filmData);
          }, 2000);
        }).catch(error => {
          console.log(error)
        }).finally(()=>{
          this.size = this.size + 4
        });
    },
    //播放视频
    playFilm(filmName,filmTitle) {
      // 请求视频
      // filmName = 'cn_universDevelop_2021.mp4';
      filmName = filmName.slice(0, filmName.indexOf('.'))
      this.v_id = filmName
      this.v_title = filmTitle
<<<<<<< HEAD
      this.videoSrc = "http://124.71.107.26:8989/media/out/software/films/" + filmName + ".mp4"
=======
      this.videoSrc = "http://localhost:8989/media/out/software/films/" + filmName + ".mp4"
>>>>>>> 4519c79dfb85893d0565eabc8fe3a368b8e02c58
      // 打开播放窗口
      this.$store.dispatch('video/toggleIs', true)
    },
    // 工具函数：节流
    throttle(func, limit) {
      let inThrottle;
      return function () {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
          // 第一次触发时执行函数
          func.apply(context, args);
          inThrottle = true;
          // 设置定时器，在指定的时间间隔后将inThrottle重置为false，允许再次触发函数
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  },
  computed: {
    ...mapGetters(["getAddress"]),
    // ...mapGetters('video',["getIsVideo"]),
    bofang() {
      return this.$store.getters['video/getIsVideo']
    },
    defaultAddress() {
      if (this.filmData[0].fname == "poster.jpg")
        return ""
      return this.getAddress;
    }
  },
  mounted() {
    this.getFilms();
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
div.filmCol {
  margin: 1rem 0;
}

div.film {
  width: 100%;
  overflow: hidden;
  position: relative;
  box-shadow: none;
  border: 1px solid black;
  /*background-color: red;*/
  transition: top, box-shadow 200ms 0s ease-in;
  top: 0;
  display: flex
}

div.film:hover {
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 5px 5px gray;
  top: -10px;
  transition: top 200ms 0s ease-out;
}

div.film:hover div.information {
  opacity: 1;
  bottom: 0;
  transition: all 500ms 0s ease;
}

div.information {
  position: absolute;
  left: 0;
  bottom: -100%;
  overflow: hidden;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 1rem;
  transition: all 800ms 0s ease;
}

p.introduce {
  margin: 0;
  width: 100%;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-size: small;
}

h5.filmName {
  font-size: 1rem;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

button.play {
  padding: 2px;
  border-radius: 10px;
  color: white;
  border: 1px solid gray;
  background-color: rgba(0, 0, 0, 0.5);
}

button.play:hover {
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
<!-- // 请求完成后将滚动条拉到顶部
window.scrollTo({
  top: -100,
  behavior: 'smooth' // 可选的，使滚动过程平滑
}); -->