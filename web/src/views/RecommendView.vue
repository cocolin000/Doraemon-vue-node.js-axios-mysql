<template>
    <div class="mySlide container-fluid">
        <div class="row">
            <div class="col-12 p-0 m-0">
                <img class="w-100" src="@/assets/img/doraemo_bg_8.png">
            </div>
        </div>
    </div>
    <!--content-->
    <div class="myContent container mb-5" style="z-index: 10;">
        <div class="row p-5">
            <div class="col-12 justify-content-center d-flex"><span class="font-weight-bold">精彩推荐</span></div>
            <div class="mt-2 mb-4 col-12 justify-content-center d-flex"><span
                    class="font-weight-bold text-primary">——</span></div>
            <div class="col-12">
                <div class="row">
                    <template v-for="rec,index in recData" :key="index">
                        <RecCon :imgUrl=baseUrl+rec.fname></RecCon>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/assets/utils/request';
import RecCon from './pages/RecCon.vue';
// 引入 内容组件
export default {
    name: 'recommentView',
    components:{
        RecCon
    },
    data() {
        return {
        //热点图
            recData: [],
            baseUrl:"http://localhost:8080/media/img/wonderful/",
        }
    },
    created(){
        axiosInstance.post('/media', {
            url: "/img/wonderful/",
            size: 10
        })
            .then(response => {
                this.recData = response.data.data
            }).catch(error => {
                console.log(error)
            })
    },
    methods:{
    },
}
</script>