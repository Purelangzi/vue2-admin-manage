<template>
  <div class="tag">
    <el-tag
      v-for="(item,index) in selectTab"
      :key="item.name"
      :closable="item.name!=='home'"
      :effect="$route.name == item.name?'dark' :'light'"
      @click="changeTag(item)"
      @close="closeTag(item,index)"
      size="medium "
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "CommonTag",
  computed: {
    
    ...mapState('tab',['selectTab'])
  },
  methods: {
    changeTag(item){
        this.$router.push({
            name:item.name
        })
    },
    // 删除Tag
    closeTag(item,index){
      this.$store.commit('tab/REMOVE_SELECTTAB',item)
      // 已删除后的标签数据长度
      const length = this.selectTab.length 
      // 不是删除当前所在的标签就不继续执行后面的代码
      if(item.name !==this.$route.name) return

      // 删除的是最后一项
      if(index == length){
        this.$router.push({
          name:this.selectTab[index-1].name
        })
      }else {
        this.$router.push({
          name:this.selectTab[index].name
        })
      }







      // 自己独立实现的

      // 要删除标签的前一个标签
      // let tagName = this.selectTab[index-1].name
     /* 删除当前所在的标签,跳转到删除标签的前（后）一个标签，
     当标签只剩下首页时才会跳转到首页 */
      /* if(this.$route.name == item.name){
        // 能删除标签列表的第一个且第二个标签存在
        if(index==1&&this.selectTab[index]){
           this.$router.push({
            // 跳转到删除标签的后一个标签（第二个）
              name:this.selectTab[index].name
            })
        }else{
          // 除了能删除标签的第一个标签以外，后面的标签都跳转到删除当前标签的前一个标签（包括最后一个跳转到倒数第二个）
          this.$router.push({
            name:tagName
          })
        }
      } */
    }
  },
  mounted(){
    
  },
};
</script>

<style lang="less" scoped>
.tag{
  padding-bottom:20px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>