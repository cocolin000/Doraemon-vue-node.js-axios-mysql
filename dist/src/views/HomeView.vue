<template>

    <!--banner-->
    <div class="mySlide container-fluid">
        <div class="row">
            <div class="col-12 p-0 m-0">
                <div class="carousel slide carousel-fade" data-interval="3000" data-ride="carousel"
                    id="carouselExampleIndicators">
                    <ol class="carousel-indicators">
                        <li class="active" data-slide-to="0" data-target="#carouselExampleIndicators"></li>
                        <li data-slide-to="1" data-target="#carouselExampleIndicators"></li>
                        <li data-slide-to="2" data-target="#carouselExampleIndicators"></li>
                    </ol>
                    <div class="carousel-inner">
                        <template v-for="banner, index in banners" :key="index">
                            <div v-if="index > 0" class="carousel-item" :class="{ active: index === 1 }">
                                <img class="w-100 d-block" v-if="defaultAddress == ''" src="@/assets/img/poster.jpg">
                                <img class="w-100 d-block" v-else :src="defaultAddress + banner.fpath + banner.fname">
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--content-->
    <div class="myContent container">
        <div class="row p-5">
            <div class="col-12 justify-content-center d-flex"><span class="font-weight-bold">版块分类</span></div>
            <div class="mt-3 mb-3 col-12 justify-content-center d-flex"><span
                    class="font-weight-bold text-primary">——</span></div>
            <div class="col-12">
                <div @click="routerClick" class="row justify-content-center">
                    <div v-for="section, index in sections" :key="index" class="col-lg-2 col-md-4 col-6 p-1 m-0 ">
                        <a :href="section.to" :title="section.title" class="nav-link d-flex flex-column align-items-center">
                            <!-- 图标 -->
                            <i :class="section.iconClass" :href="section.to" class="fa d-block" style="font-size: 2rem"></i>
                        </a>
                        <div class="lineTop"></div>
                        <div class="lineRight"></div>
                        <div class="lineBottom"></div>
                        <div class="lineLeft"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row bg-light p-5">
            <div class="col-lg-12 justify-content-center d-flex"><span class="font-weight-bold">哆啦A梦</span></div>
            <div class="mt-3 mb-3 col-lg-12 justify-content-center d-flex"><span
                    class="font-weight-bold text-primary">——</span></div>
            <div class="col-lg-12 p-4">
                <div class="row d-flex align-items-center">
                    <div class="col-lg-4 col-md-12"><img alt="..." class="img-fluid" :src="baseUrl + paper">
                    </div>
                    <div class="col-lg-8 col-md-12 bg-white pt-3 pb-3">
                        <div style="font-size: 1.25rem">
                            <p class="small" style="letter-spacing: 1px;line-height: 1.25rem">
                                漫画叙述了一只来自22世纪的猫型机器人——哆啦A梦，受主人野比世修的托付，回到20世纪，借助从四维口袋里拿出来的各种未来道具，来帮助世修的高祖父——小学生野比大雄化解身边的种种困难问题，以及生活中和妈妈野比玉子、身边的小伙伴静香、胖虎、小夫发生的轻松幽默搞笑感人的故事。
                                漫画自1970年1月开始在《小学1-4年级生》杂志中开始连载，并且大受小学生欢迎。《哆啦A梦》系列的篇幅浩繁，由原作者亲自执笔的短篇漫画共1345回（分为45卷单行本），大长篇漫画16回，《哆啦A梦Plus》6卷，在藤本弘去世后，又由其弟子创作了大量漫画，仍有新作在不断推出。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import axiosInstance from '@/assets/utils/request';
import { mapGetters } from 'vuex';
export default {
    name: 'HomeView',
    data() {
        return {
<<<<<<< HEAD
            baseUrl: "http://124.71.107.26:8989/media/img/banner/",
=======
            baseUrl: "http://localhost:8989/media/img/banner/",
>>>>>>> 4519c79dfb85893d0565eabc8fe3a368b8e02c58
            banners: [{}, {
                fpath: "/media/img/",
                fname: "poster.jpg"
            }],
            //固定
            paper: "doraemo_bg_1.jpg",
            //版块
            sections: [
                {
                    title: '剧场版',//标题
                    iconClass: 'fa-film',//图标
                    to: '/film',//指向
                },
                {
                    title: '榜单',//标题
                    iconClass: 'fa-bar-chart-o',//图标
                    to: '/',//指向
                },
                {
                    title: '视频',//标题
                    iconClass: 'fa-play-circle-o',//图标
                    to: '/play',//指向
                },
                {
                    title: '收藏',//标题
                    iconClass: 'fa-bookmark-o',//图标
                    to: '/',//指向
                },
                {
                    title: '影评',//标题
                    iconClass: 'fa-twitch',//图标
                    to: '/',//指向
                },
                {
                    title: '更多',//标题
                    iconClass: 'fa-cubes',//图标
                    to: '/',//指向
                },
            ]
        }
    },
    computed: {
        ...mapGetters(["getAddress"]),
        defaultAddress() {
            if (this.banners[1].fname == "poster.jpg")
                return ""
            return this.getAddress;
        }
    },
    mounted() {
        axiosInstance.post('/media', {
            url: "/img/banner/",
            size: 4
        })
            .then(response => {
                setTimeout(() => { this.banners = response.data.data == "" ? this.banners : response.data.data }, 2000)
            }).catch(error => {
                console.log(error.message)
            })
    },
    methods:{
        routerClick(event){
            event.preventDefault();
            const route = event.target.getAttribute("href");
            this.$router.push(route)
        }
    }
}
</script>
<style scoped>
/*slide*/
div.mySlide {
    /*background-color: rgba(149,204,255,0.74);*/
    padding: 0 !important;
    /*margin: 0 !important;*/
    /*margin-top: -10rem;*/
    position: relative;
    top: -8vw;
}

div.mySlide * {
    z-index: -1;
}

/*content*/
div.myContent {
    /*margin:-10vw 100px 0 0;*/
    margin-top: -8vw;
    padding: 2rem;
}

div.myContent a {
    display: block;
    cursor: pointer;
    color: black;
    font-size: 1px;
    background-color: transparent;
    transition: background-color 1s 0s ease-in;
    padding: 0.5rem;
}

div.myContent a * {
    cursor: pointer;
}

div.myContent a:hover {
    background-color: #dff2f6;
    transition: background-color 1s 0s ease-out;
}

div.myContent li {
    margin: 0 2rem;
}

/*边框*/
div.myContent div:has(> a.nav-link) div {
    position: absolute;
    transition: all 1s 0s ease;
    background-color: lightblue;
}

div.myContent div:has(> a.nav-link):hover div:nth-child(odd) {
    height: 100%;
}

div.myContent div:has(> a.nav-link):hover div:nth-child(even) {
    width: 100%;
}

/*左右格式*/
div.myContent div:has(> a.nav-link) div:nth-child(odd) {
    height: 0;
    width: 2px;
}

/*上下格式*/
div.myContent div:has(> a.nav-link) div:nth-child(even) {
    height: 2px;
    width: 0;
}

div.myContent div:has(a.nav-link) div.lineTop {
    /*background: rgba(255, 0, 0, 0.5);*/
    top: 0;
    left: 0;
    /*    width: 100%;
      height: 2px;*/
}

div.myContent div:has(a.nav-link) div.lineRight {
    /*background: rgba(0, 0, 255, 0.5);*/
    right: 0;
    top: 0;
    /*    height: 100%;
      width: 2px*/
}

div.myContent div:has(a.nav-link) div.lineBottom {
    /*background: rgba(0, 0, 0, 0.5);*/
    bottom: 0;
    right: 0;
    /*    width: 100%;
      height: 2px*/
}

div.myContent div:has(a.nav-link) div.lineLeft {
    /*background: rgba(0, 255, 0, 0.5);*/
    left: 0;
    bottom: 0;
    /*    height: 100%;
      width: 2px*/
}

figure {
    padding: 1px;
    /*border: 1px solid red;*/
}

figure div.outBox {
    width: 100%;
    height: 150px;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

figure img {
    border-radius: 5px;
}

figure img:hover {
    cursor: pointer;
}

figcaption {
    font-size: small;
}

div.mySlide {
    /*box-shadow: 0 0 0 0, 0 0 0 0 ,0 -1vw 1rem 1px gray inset, 0 0 0 0;*/
}

div.mySlide * {
    z-index: -1;
}

div.myContent {
    background-color: rgba(255, 255, 255, 0.8);
    /*margin-top: -8rem;*/
}

div.myContent a {
    color: lightcoral;
}

div.myContent a:hover {
    color: deeppink;
}
</style>
