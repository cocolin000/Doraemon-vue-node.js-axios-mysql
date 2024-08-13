<template>
    <my-alter v-show="tood" :content=altCons></my-alter>
    <div class="mySlide container-fluid">
        <div class="row">
            <div class="col-12 p-0 m-0">
                <img alt="dream" class="w-100" src="@/assets/img/doraemo_bg_7.png">
            </div>
        </div>
    </div>
    <!--content-->
    <div class="myContent container">
        <div class="row bg-light p-5">
            <div class="col-lg-12 justify-content-center d-flex"><span class="font-weight-bold">注册/登录</span></div>
            <div class="mt-3 mb-3 col-lg-12 justify-content-center d-flex"><span
                    class="font-weight-bold text-primary">——</span></div>
            <div class="col-lg-8 offset-lg-2 p-4 d-flex justify-content-center">
                <form action="" @submit.prevent="putUser" autocomplete="off" class="was-validated w-100">
                    <div class="form-group">
                        <label for="uname">用户名:</label>
                        <input class="form-control" v-model="formData.name" id="uname" minlength="3" name="uname"
                            placeholder="Enter username" required type="text">
                        <div class="valid-feedback">验证成功！</div>
                        <div class="invalid-feedback">请输入用户名(至少三位)！</div>
                    </div>
                    <div class="form-group">
                        <label for="pwd">密码:</label>
                        <input class="form-control" v-model.trim="formData.pwd" id="pwd" minlength="8" name="pswd"
                            placeholder="Enter password" required type="password">
                        <div class="valid-feedback">验证成功！</div>
                        <div class="invalid-feedback">请输入密码(至少八位)！</div>
                    </div>
                    <template v-if="formData.state == 0">
                        <div class="form-group">
                            <label for="tel">手机号码:</label>
                            <input class="form-control" v-model="formData.tel" id="tel" maxlength="11" minlength="11"
                                name="tel" placeholder="Enter telephone" required type="tel">
                            <div class="valid-feedback">验证成功！</div>
                            <div class="invalid-feedback">请输入手机号码(十一位)！</div>
                        </div>
                        <div class="form-group">
                            <label for="email">邮箱:</label>
                            <input class="form-control" v-model="formData.email" id="email" name="email"
                                placeholder="Enter e-mail" required type="email">
                            <div class="valid-feedback">验证成功！</div>
                            <div class="invalid-feedback">请输入邮箱地址！</div>
                        </div>
                        <div class="form-group form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" name="remember" required type="checkbox"> 同意<a
                                    data-target="#staticBackdrop" data-toggle="modal" href="#">用户协议</a>
                            </label>
                            <!--					model-->
                            <div aria-hidden="true" aria-labelledby="staticBackdropLabel" class="modal fade "
                                data-backdrop="static" data-keyboard="false" id="staticBackdrop" tabindex="-1">
                                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel"
                                                onclick="document.body.style.overflow='overlay !important'">用户协议</h5>
                                        </div>
                                        <div class="modal-body" onclick="return false;">
                                            <h3>一、总则</h3>
                                            <p>
                                                此份协议是注册用户接受MyDream网站（以下简称本站）产品和服务时适用的通用条款。因此，请您在注册成为本站用户前或接受本站的产品和服务之前，请您详细地阅读本注册用户协议的所有内容。
                                            </p>
                                            <p>1、注册用户了解并同意：</p>
                                            <p>
                                                ①只要注册用户点击“同意”按钮并完成注册，注册用户就已接受了本注册用户协议及本站公布的各项服务规则（包括填写实名的联系方式等等），并愿意受其约束。如果发生纠纷，注册用户不得以未仔细阅读为由进行抗辩。
                                            </p>
                                            <p>
                                                ②随着市场经营情况的变化，本站有权随时更改本注册用户协议及相关服务规则。修改本注册用户协议时，本站将于相关页面公告修改的事实，有权不对注册用户进行个别通知。注册用户应该在每次登录前查询网站的相关公告，以了解注册用户协议及其他服务规则的变化。
                                            </p>
                                            <p>
                                                2、若注册用户不同意本注册用户协议或相关服务规则，或者不同意本站作出的修改，注册用户可以主动停止使用本站提供的产品和服务，如果在本站修改协议或服务规则后，注册用户仍继续使用本站提供的产品和服务，即表示注册用户同意本站对本注册用户协议及相关服务规则所做的所有修改。由于注册用户在注册用户协议变更后因未熟悉公告规定而引起的损失，本站将不会承担任何责任。
                                            </p>
                                            <p>
                                                3、本站的各项电子服务的所有权和运作权归本站。本站提供的服务将完全按照其发布的服务条款和操作规则严格执行。注册用户必须完全同意所有服务条款并完成注册程序，才能成为本站的注册用户。注册用户确认：本协议条款是处理双方权利义务的当然约定依据，除非违反国家强制性法律，否则始终有效。
                                            </p>
                                            <h3>二、服务简介</h3>
                                            <p>
                                                1、本站运用自己的操作系统通过国际互联网络为注册用户提供网络服务。同时，注册用户必须：自行配备上网的所需设备，包括个人电脑、调制解调器或其他必备上网装置。自行负担个人上网所支付的与此服务有关的电话费用、网络费用。
                                            </p>
                                            <p>2、基于本站所提供的网络服务的重要性，注册用户应同意：提供详尽、准确的个人资料。不断更新注册资料，符合及时、详尽、准确的要求。</p>
                                            <p>
                                                3、本站对注册用户的电子邮件、手机号等隐私资料进行保护，承诺不会在未获得注册用户许可的情况下擅自将注册用户的个人资料信息出租或出售给任何第三方，但以下情况除外：注册用户同意让第三方共享资料；注册用户同意公开其个人资料，享受为其提供的产品和服务；本站需要听从法庭传票、法律命令或遵循法律程序；本站发现注册用户违反了本站服务条款或本站其它使用规定。
                                            </p>
                                            <p>4、关于注册用户隐私的具体协议以本站的隐私声明为准。如果注册用户提供的资料包含有不正确的信息，本站保留结束注册用户使用网络服务资格的权利。</p>
                                            <h3>三、账户密码和安全性</h3>
                                            <p>
                                                注册用户一旦注册成功，成为本站的合法的注册用户。您可随时根据需要改变您的密码。注册用户将对注册用户名和密码安全负全部责任。另外，每个注册用户都要对以其注册用户名进行的所有活动和事件负全责。注册用户若发现任何非法使用注册用户账户或存在安全漏洞的情况，请立即通告本站。
                                            </p>
                                            <h3>四、拒绝提供担保</h3>
                                            <p>
                                                注册用户个人对网络服务的使用承担风险。本站对此不作任何类型的担保，不论是明确的或隐含的，但是不对商业性的隐含担保、特定目的和不违反规定的适当担保作限制。本站不担保服务一定能满足注册用户的要求，也不担保服务不会受中断，对服务的及时性，安全性，出错发生都不作担保。
                                            </p>
                                            <h3>五、有限责任</h3>
                                            <p>
                                                本站对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害可能来自：不正当使用网络服务，在网上购买商品或进行同类型服务，在网上进行交易，非法使用网络服务或注册用户传送的信息有所变动。这些行为都有可能会导致本站的形象受损，所以本站事先提出这种损害的可能性。
                                            </p>
                                            <h3>六、通告</h3>
                                            <p>
                                                所有发给注册用户的通告都可通过重要页面的公告或电子邮件或常规的信件传送。本站的活动信息也将定期通过页面公告及电子邮件方式向注册用户发送。注册用户协议条款的修改、服务变更、或其它重要事件的通告会以电子邮箱或者短信进行通知。
                                            </p>
                                            <h3>七、注册用户的建议奖励</h3>
                                            <p>
                                                注册用户在他们发表的一些良好建议以及一些比较有价值的策划方案时，本站愿意展示用户的构想落于实现，这其中本站会对一些比较好的注册用户反馈信息进行不等的产品奖励或者是积分奖励，但如出现用户策划与广告销售商之间的矛盾本站不承担任何责任。
                                            </p>
                                            <h3>八、责任限制</h3>
                                            <p>
                                                1、如因不可抗力或其他本站无法控制的原因使本站销售系统崩溃或无法正常使用导致网上交易无法完成或丢失有关的信息、记录等，本站不承担责任。但是本站会尽可能合理地协助处理善后事宜，并努力使客户免受经济损失。
                                            </p>
                                            <p>
                                                2、除了本站的使用条件中规定的其它限制和除外情况之外，在中国法律法规所允许的限度内，对于因交易而引起的或与之有关的任何直接的、间接的、特殊的、附带的、后果性的或惩罚性的损害，或任何其它性质的损害，本站、本站的董事、管理人员、雇员、代理或其它代表在任何情况下都不承担责任。
                                            </p>
                                            <h3>九、法律管辖和适用</h3>
                                            <p>1、本协议的订立、执行和解释及争议的解决均应适用中国法律。</p>
                                            <p>2、如发生本站服务条款与中国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它合法条款则依旧保持对注册用户产生法律效力和影响。</p>
                                            <p>3、本协议的规定是可分割的，如本协议任何规定被裁定为无效或不可执行，该规定可被删除而其余条款应予以执行。</p>
                                            <p>4、如双方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向本站所在地的中国人民法院提起诉讼。</p>
                                            <h3>十、其他规定</h3>
                                            <p>1、如本用户协议中的任何内容无论因何种原因完全或部分无效或不具有执行力，本用户协议的其余内容仍应有效并且对协议各方有约束力。</p>
                                            <p>2、本用户协议中的标题仅为方便而设，不具法律或契约效果。</p>
                                        </div>
                                        <div class="modal-footer">
                                            <button class="btn btn-secondary" data-dismiss="modal" type="button">关闭
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="valid-feedback">验证成功！</div>
                            <div class="invalid-feedback">同意协议才能提交。</div>
                        </div>
                    </template>
                    <button class="btn btn-primary" type="submit" v-if="formData.state == 1">登录</button>
                    <button class="btn btn-primary" type="submit" v-else >注册</button>
                    <button class="btn btn-primary ml-2" @click.prevent="toggleNowState">切换</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/assets/utils/request';
import MyAlter from './pages/MyAlter.vue';
export default {
    name: 'loginView',
    data() {
        return {
            formData: {
                name: "",
                // "raymax",
                pwd: "",
                // "00000000",
                state: 1,
                // tel:"15698536211",
                // email:"312312@123123123"
            },
            altCons: { id: 0, content: "加载中" },
            tood: false,
        }
    },
    methods: {
        toggleNowState(){
            let state = 0;
            let name = this.formData.name;
            let pwd = this.formData.pwd;
            if(this.formData.state==0){
                state = 1;
                this.formData={
                    name: name,
                    pwd: pwd,
                    state:state
                }
            }else{
                this.clearFormData();
                this.formData.state= state;
            }
        },
        async putUser() {
            this.showLoading();
            try {
                const response = await axiosInstance.post('/login', this.formData);
                if (response.data.code == 200 && (response.data.msg=="登录成功"||response.data.msg.includes("注册成功"))  && response.data.data ) {
                    this.toggleLoginState(true,response.data.data)
                    this.showSuccess(response.data.msg);
                } else {
                    this.showError(response.data.msg);
                }
            } catch (error) {
                console.error(error);
                this.showError("请求出错");
            } finally {
                this.hideLoading();
            }
        },
        showLoading() {
            this.altCons.content = "加载中";
            this.toggleAlter(true);
        },
        showSuccess(msg) {
            this.altCons.content = msg;
        },
        showError(msg) {
            this.altCons.content = msg;
        },
        clearFormData() {
            this.formData = {
                name: "",
                pwd: "",
                tel: "",
                email: "",
                state: 1
            };
        },
        hideLoading() {
            setTimeout(() => {
                this.toggleAlter(false);
            }, 2000);
        },
        toggleAlter(state) {
            this.tood = state || !this.tood;
        },
        toggleLoginState(state,user){
            // 保存登录状态
            // localStorage.setItem("isAuthenticated",JSON.stringify({state:state,user:user}));
            sessionStorage.setItem("isAuthenticated",JSON.stringify({state:state,user:user}))
            //保存登录成功用户
            this.$store.dispatch("toggleLoginState",{state:state,user:user});
            //跳转路由
            setTimeout(() => {
                this.$router.replace("/")
                this.clearFormData();
            }, 2000);
        }
    },
    components: {
        MyAlter
    }
}
</script>