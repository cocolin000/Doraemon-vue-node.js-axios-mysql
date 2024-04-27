<template>
    <header>
        <div class="myNav container-fluid">
            <div class="row">
                <div class="col-12">
                    <nav class="navbar navbar-expand-sm navbar-dark">
                        <!-- Brand -->
                        <a class="navbar-brand d-flex" href="#"><img src="@/assets/img/doraemon_logo.png"
                                style="width: 3rem">
                            <span style="font-family: '方正少儿_GBK',serif;color: white;font-size: 2rem;">哆啦A梦</span></a>
                        <!-- Toggler/collapsibe Button -->
                        <button class="navbar-toggler" data-target="#collapsibleNavbar" data-toggle="collapse"
                            type="button">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <!-- Navbar links -->
                        <div class="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul class="navbar-nav w-100 justify-content-center align-items-end align-items-sm-center">
                                <li class="nav-item">
                                    <router-link class="nav-link p-1 active" to="/">欢迎大厅</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link p-1" to="/recommend">精彩瞬间</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link p-1 " to="/special">角色百科</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link p-1 " to="/film">剧场大片</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link class="nav-link p-1 " to="/play">视频推荐</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link v-if="!getLogin"
                                        class="d-block d-sm-none border login p-1 rounded nav-link"
                                        to="/login">注册/登录</router-link>
                                    <div v-else class="small dropdown d-block d-sm-none">
                                        <button :title="getUser.uid"
                                            class="float-right btn btn-info text-light dropdown-toggle" type="button"
                                            data-toggle="dropdown" aria-expanded="false">
                                            {{ getUser.name }}
                                        </button>
                                        <div class="small dropdown-menu bg-transparent dropdown-menu-right">
                                            <a class=" p-1 rounded nav-link my-space dropdown-item" href="#">个人空间</a>
                                            <a class="  p-1 rounded nav-link my-exit dropdown-item" href="#"
                                                @click="exit">退出登录</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <router-link v-if="!getLogin" class="d-none d-sm-block border p-1 rounded nav-link login"
                            to="/login">注册/登录</router-link>
                        <div v-else class="small dropdown d-none d-sm-block">
                            <button :title="getUser.uid" class=" btn btn-info text-light dropdown-toggle" type="button"
                                data-toggle="dropdown" aria-expanded="false">
                                {{ getUser.name }}
                            </button>
                            <div class="small dropdown-menu bg-transparent dropdown-menu-left">
                                <a class=" p-1 rounded nav-link my-space dropdown-item" href="#">个人空间</a>
                                <a class=" p-1 rounded nav-link my-exit dropdown-item" href="#" @click="exit">退出登录</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: 'headerView',
    computed: {
        getLogin() {
            return this.$store.getters.getLogin
        },
        getUser() {
            return this.$store.getters.getUser
        }
    },
    methods: {
        exit() {
            localStorage.removeItem('isAuthenticated')
            this.$store.dispatch('toggleLoginState', {
                state: false,
                user: {
                    name: "NULL",
                    uid: "NULL",
                }
            })
            this.$router.replace('/')
        }
    }
}
</script>

<style scoped>
header {
    width: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7));
    border-bottom: 1px solid white;
    position: fixed;
    z-index: 999;
}

div.dropdown-menu-right {
    text-align: right;
}

.navbar-nav * {
    cursor: pointer;
}

div.myNav a {
    color: white !important;
}

/*
  router-link-active vue自带类
  */
div.myNav .router-link-active {
    background-color: lawngreen !important;
    color: black !important;
    border-radius: 5px !important;
}

div.myNav a:not(.navbar-brand):hover {
    background-color: lightblue !important;
    border-radius: 5px !important;
    color: black !important;
}

div.myNav li {
    margin: 0 1vw;
}
</style>
