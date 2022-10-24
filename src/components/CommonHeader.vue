<template>
  <div class="header-container">
    <div class="l-container">
      <el-button
        style="margin-right: 20px"
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <span class="text">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in selectTab"
            :key="item.path"
            :to="{ path: item.path }"
            >{{ item.label }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </span>
    </div>
    <div class="r-container">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="@/assets/images/user.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "CommonHeader",
  data() {
    return {};
  },
  methods: {
    // handleMenu(){
    //   this.$store.commit('tab/COLLAPSE_AISDEMEMU')
    // }
    // Aside侧边栏修改
    ...mapMutations("tab", { handleMenu: "COLLAPSE_AISDEMEMU" }),

    // 点击菜单项触发的事件
    handleClick(command) {
      // 指令（标识）为登出
      if (command == "loginOut") {
        this.$cookie.remove("token");
        this.$cookie.remove("menu");
        // 登出清除面包屑数据，防止用户登陆后面包屑还留存上个用户的操作
        this.$store.commit('tab/REMOVE_ALLSELECTTAB')
        this.$message.success("登出成功");
        this.$router.push("/login");
      }
    },
  },
  computed: {
    // 面包屑数据
    /* ...mapState({
      kkc: state => state.tab.selectTab
    }) */
    ...mapState("tab", ["selectTab"]),
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    font-size: 14px;
    color: #fff;
    margin-left: 10px;
  }
  .r-container {
    .user {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
  .l-container {
    display: flex;
    align-items: center;
    // /deep/样式穿透,因为element-ui组件样式有限制
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        // el-breadcrumb__inner .is-link
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          &.is-link {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>