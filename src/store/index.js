import Vue from "vue";
import Vuex from 'vuex'

// 引入菜单栏
import tab from '@/store/tab'
Vue.use(Vuex);



export default new Vuex.Store({
    modules:{
        tab
    }
})