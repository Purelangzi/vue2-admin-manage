<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <el-main>
          <common-tag></common-tag>
          
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import CommonTag from '@/components/CommonTag.vue';
export default {
  components: { CommonAside, CommonHeader, CommonTag },
  name: "Main",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>


.el-header {
  padding: 0;
}
/* 隐藏侧边栏滚动条 */
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>