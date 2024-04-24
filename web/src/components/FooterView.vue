<template>
<!--footer-->
<footer class="m-0 p-0">
    <div class="container-fluid bg-dark pl-3">
        <div class="row">
            <div class="col-12 col-lg-4 offset-lg-0 col-md-5 offset-md-0 d-none d-sm-flex align-items-center col-sm-5 offset-sm-0 justify-content-sm-start justify-content-center ">
                <img alt="..."
                     src="@/assets/img/doraemon_logo.png"
                     style="width: 2rem">
                <span style="font-family: '方正少儿_GBK',serif;color: white">哆啦A梦</span>
            </div>
            <div class="col-12 col-lg-4 offset-lg-4 col-md-5 offset-md-2 col-sm-7 offset-sm-0 d-flex align-items-center justify-content-center justify-content-sm-end">
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fa fa-twitter bg-light p-2 rounded-circle text-dark"
                                                        ></i></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fa fa-weibo bg-light p-2 rounded-circle text-dark"
                                                        ></i></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fa fa-wechat bg-light p-2 rounded-circle text-dark"
                                                        ></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>
</template>
<script>
export default{
    name:'footerView'
}
</script>
<style scoped>
footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: red;
}
a.nav-link,span{
    font-size: 1.5rem
}
div.container-fluid{
}
*{
}
</style>