<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
      <el-menu-item
        v-for="item in noChildren"
        :key="item.name"
        :index="item.name"
        @click="ClickAsideMenu(item)"
      >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu
        v-for="item in hasChildren"
        :key="item.label"
        :index="item.label"
      >
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.label"
        >
          <el-menu-item :index="subItem.name" @click="ClickAsideMenu(subItem)">{{
            subItem.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CommonAside",
  data() {
    return {
      
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击菜单跳转到对应组件
    ClickAsideMenu(item) {
      this.$router.push(item.path);
      
      this.$store.commit('tab/ADD_SELECTTAB',item)
    },
    // ...mapMutations('tab',{ClickAsideMenu:'ADD_SELECTTAB'})

  },
  computed: {
    menuData(){
      // 当前缓存没有就获取store的菜单数据
      return JSON.parse(this.$cookie.get('menu')) || this.$store.tab.menu
    },
    // 没有子菜单
    noChildren() {
      
      return this.menuData.filter((item) => !item.children);
    },
    // 有子菜单
    hasChildren() {
      
      return this.menuData.filter((item) => item.children);
    },
    // 映射vuex里模块tab中的state里的isCollapse数据
    // isCollapse(){
    //   return this.$store.state.tab.isCollapse
    // }
    ...mapState("tab", ["isCollapse"]),
  },
  mounted() {
    
    
   
  },
};
</script>

<style lang="less" scope>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border-right: 0;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>