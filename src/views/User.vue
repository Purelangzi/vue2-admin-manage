<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择活">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitUserForm">确 定</el-button>
      </span>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="handleAdd"> + 新增</el-button>
      
      <el-form :model="searchUserForm" ref="searchUserForm" :inline="true">
        <el-form-item v-show="this.showReturn" >
          <el-button type="primary" @click="onReturn">返回用户列表</el-button>
           
        </el-form-item>
        
        
        <el-form-item prop="name">
          <el-input
            v-model="searchUserForm.name"
            placeholder="请输入查询的姓名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table height="90%" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template v-slot="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @current-change="pageChange"
          :total="total"
          layout="prev, pager, next"
          :background="true"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "@/api";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      //新增和编辑的用户表单弹出框
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      //新增和编辑的用户表单弹出框的规则
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
          },
        ],
        birth: [
          {
            required: true,
            message: "请选择出生日期",
          },
        ],
        addr: [
          {
            required: true,
            message: "请输入地址",
          },
        ],
      },
      tableData: [],// 渲染的用户列表数据
      modalType: 0, //0表示新增的弹窗，1表示编辑的弹窗
      total: 0,// 当前总条数
      // 页面数据
      pageData: {
        page: 1,
        limit: 20,
      },
      // 查询表单
      searchUserForm: {
        name: "",
      },
      // 控制查询后返回用户列表按钮的显隐
      showReturn: false,
    };
  },
  methods: {
    // 提交表单
    submitUserForm() {
      this.$refs.form.validate((valid) => {
        // 校验通过，不为空
        if (valid) {
          if (this.modalType == 0) {
            addUser(this.form).then(() => {
              this.$message.success("添加成功");
              // 重新获取用户列表数据
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.$message.success("编辑成功");
              // 重新获取用户列表数据
              this.getList();
            });
          }

          // 重置表单，关闭表单框
          this.handleClose();
        }
      });
    },
    // 表单框关闭时，对整个表单进行重置，然后关闭表单框
    handleClose() {
      this.$refs.form.resetFields();

      this.dialogVisible = false;
    },
    // 取消按钮
    cancel() {
      this.handleClose();
    },
    // 新增按钮
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    // 编辑按钮
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      /* 不能直接赋值，对象直接赋值成浅拷贝(共享同一块内存空间，引用地址相同)了，form改变,row也变，
      而row是从tableData获取到的数据！一旦row变，数据在页面渲染时也跟着变，
      还没有提交修改，数据就已经在页面上变化，不可以！ */
      // this.form = row;

      // 通过JSON的序列化和反序列化来实现深拷贝（开辟新内存空间，修改新对象，旧不变）
      // $nextTick解决resetFields()将表单重置为初始值bug
      this.$nextTick(()=>{
        this.form = JSON.parse(JSON.stringify(row));
      })
      
    },
    // 删除按钮
    handleDel(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(row).then(() => {
            this.$message.success("删除成功");
            // 查询后删除重置name
            if (this.searchUserForm.name && this.total == 1) {
              this.showReturn = false;
              this.$refs.searchUserForm.resetFields();
            }

            // 重新获取用户列表数据
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 查询列表
    onSearch() {
      this.showReturn = true;
      this.getList();
      this.$message.success("搜索成功");
    },
     // 查询后返回用户列表
    onReturn(){
      this.showReturn = false;
      this.$refs.searchUserForm.resetFields();
      this.getList();
    },
    // 选择页面的回调函数
    pageChange(page) {
      this.pageData.page = page;
      this.getList();
    },

    // 获取用户列表数据
    getList() {
      // 传递参数，对象合并
      getUser({ params: { ...this.pageData, ...this.searchUserForm } }).then(
        ({ data }) => {
          
          const { list, count } = data;
          this.tableData = list;
          this.total = count || 0;
        }
      );
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    height: calc(100% - 62px);
    .page {
      position: absolute;
      right: 20px;
      bottom: 0;
    }
  }
}
</style>