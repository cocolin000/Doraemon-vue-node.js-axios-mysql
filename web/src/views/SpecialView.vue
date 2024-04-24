<template>
  <div class="mySlide container-fluid">
    <div class="row">
        <div class="col-12 p-0 m-0">
            <img class="w-100" src="@/assets/img/doraemo_bg_12.jpg">
        </div>
    </div>
</div>
<!--content-->
<div class="myContent container" style="z-index: 10">
    <div class="row p-5">
        <div class="col-12 justify-content-center d-flex"><span class="font-weight-bold">主要角色</span></div>
        <div class="mt-2 mb-4 col-12 justify-content-center d-flex"><span
                class="font-weight-bold text-primary">——</span></div>
        <div class="col-12 pb-5">
            <!--角色-->
            <template v-for="per,index in perData" :key="index">
                <div class="CutInItem pt-3 pb-3 row border-bottom align-items-center">
                    <div class="col-xl-4 offset-xl-0 col-lg-3 offset-lg-1 col-md-4 col-12 photoCol">
                        <div class=" personPhoto" style="">
                            <img class="img-fluid" :src="getAddress+per.fpath+per.fname">
                        </div>
                    </div>
                    <div class="mt-2 align-items-center info col-xl-8 offset-xl-0 col-lg-7 offset-lg-1 col-md-7 offset-md-1 col-12 ">
                        <h5 class="font-weight-bold personName">{{per.title}}</h5>
                        <p :title="per.introduce">{{per.introduce}}</p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</div>
</template>
<script>
import axiosInstance from '@/assets/utils/request'
import { mapGetters } from 'vuex'
export default{
  name:'SpecialView',
data(){
    return{
           perData:[
            {
                fpath:"加载中……",
                fname:"加载中……",
                title:"加载中……",
                introduce:"加载中……",
            }
           ], 
    }
  },
  computed:{
    ...mapGetters(["getAddress"])
  },
  mounted(){
    axiosInstance.post('/media', {
            url: "/img/person/",
            size: 10
        })
            .then(response => {
                this.perData = response.data.data
            }).catch(error => {
                console.log(error)
            })
  }
}
</script>
<style scoped>
div.photoCol {
    display: flex;
    justify-content: center;
    align-items: center
}

div.personPhoto {
    padding: 1rem;
    width: 200px;
    height: 200px;
    border: 1px solid lightblue;
    /*border-radius: 50%;*/
    overflow: hidden;
    display: flex;
    justify-content: center;
}

h5.personName {
    order:0;
}

div.CutInItem{
}

div.info p {
    text-indent: 2rem;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}

div.info{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}
</style>