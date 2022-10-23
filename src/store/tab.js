
// 菜单栏数据
export default {
    namespaced: true,

    mutations: {
        // 修改侧边菜单栏的隐藏开关
        COLLAPSE_AISDEMEMU(state) {
            state.isCollapse = !state.isCollapse
        },
        // 增加公共面包屑组件数据
        ADD_SELECTTAB(state, value) {
            if (value.name !== 'home') {
                const index = state.selectTab.findIndex(item => item.name === value.name)
                if (index === -1) {
                    state.selectTab.push(value)
                }
            }
        },
        // 删除公共面包屑组件数据
        REMOVE_SELECTTAB({selectTab},val){
            const index = selectTab.findIndex(item=>item.name == val.name)
            selectTab.splice(index,1)
        },
        // 设置菜单栏menu数据
        SET_MENU(state,val){
            state.menu = val
        },
        // 动态注册路由
        ADD_MENU(state,router){
            // 判断当前缓存中是否有数据
            
        }

    },
    state: {
        // 侧边菜单栏隐藏开关
        isCollapse: false,
        // 面包屑数据
        selectTab: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],
        // 菜单栏
        menu:[]
    }
}