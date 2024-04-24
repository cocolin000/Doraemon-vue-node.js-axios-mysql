<template>
    <div @mousewheel.prevent class="win" @click.stop="close">
        <div class="contaner">
            <div class="content">
                <img v-if="content.id === 1" :src=content.content />
                <h1 v-else>{{ content.content }}</h1>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "myAlter",
    props: {
        content: Object,
        isAlter:Boolean
    },
    computed: {

    },
    data() {
        return {

        }
    },
    methods:{
        close(){
            this.$emit('isAlter',false)
        }
    }
}
</script>
<style scoped>
.win {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    background-color: rgba(0,0,0,0.5);
}


.win .contaner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
}

.win .content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px;

}

.win img {
    width: 80%;
    height: 80%;
}
</style>