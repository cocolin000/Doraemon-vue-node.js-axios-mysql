const state = {
    // 是否弹出video
    is: false,
}

const mutations = {
    toggleIs(state, status) {
        state.is = status
    }
}

const actions = {
    // 改变video弹出框状态
    toggleIs(context, state) {
        // console.log(state)
        context.commit("toggleIs", state)
    }
}

const getters = {
    // 获取video状态
    getIsVideo(state) {
        return state.is
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}