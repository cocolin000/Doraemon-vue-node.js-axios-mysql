<template>
            <my-alter v-show="tood" @isAlter="toggleAlter" :content=altCons></my-alter>
    <div @click="toggleAlter" class="col-sm-4 col-6">
        <figure>
            <div class="outBox">
                <img class="img-fluid" :src=imgUrl>
            </div>
            <figcaption class="small p-1 d-flex justify-content-between align-items-end">
                <span>精彩图片</span>
                <a class="information " href="#">了解更多</a>
            </figcaption>
        </figure>
    </div>
</template>

<script>
import MyAlter from './MyAlter.vue';
export default{
    name:'recCon',
    //接受父组件传过来的数据
    props:{
        imgUrl:{
            type:String,
            default:"https://dummyimage.com/200x100/333/fff&text=1314"
        }
    },
    data(){
        return{
            altCons:{id:1,content:this.imgUrl},
            tood:false,
        }
    },
    computed:{
    },
    methods:{
        toggleAlter(state){
        this.tood=state||!this.tood
        }
    },
    components:{
        MyAlter
    }
}
</script>

<style scoped>
img{
    width:100%;
    height: 15vw;
    cursor: pointer;
}
</style>