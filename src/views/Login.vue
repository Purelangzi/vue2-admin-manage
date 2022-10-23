<template>
  <el-form class="login-container" :model="loginForm" ref="loginForm" :rules="rules" label-width="70px" size="medium">
    <div class="login-title">
        <h3>登陆系统</h3>
    </div>
    <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button class="login-submit" type="primary" @click="onLogin">登陆</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// import Mock from 'mockjs'
import {getMenu} from '@/api'
export default {
    name:'Login',
    data() {
        return {
            loginForm:{
                username:'',
                password:''
            },
            rules:{
                username:[{required:true,message:'请输入用户名',trigger:'blur'}],
                password:[{required:true,message:'请输入密码',trigger:'blur'}]
            }
        }
    },
    methods: {
        onLogin(){
            
            this.$refs.loginForm.validate((valid)=>{
                if(valid){
                    getMenu(this.loginForm).then(({data})=>{
                        
                        if(data.code == 20000){
                            this.$message.success('登陆成功')
                            // 存入token信息用于不同页面跳转
                            this.$cookie.set('token',data.data.token)
                            this.$router.push('/home')
                        }else{
                            this.$message.warning('密码或用户名错误')
                        }
                        
                    })
                }
            })
            
            /* const token = Mock.Random.guid()
            this.$cookie.set('token',token)
            this.$router.push('/home') */
        }
    },
}
</script>

<style lang="less" scoped>
.login-container{
    box-sizing: border-box;
    margin: 180px auto;
    padding: 35px 35px 15px ;
    border: 1px solid #eaeaea ;
    border-radius: 15px;
    width: 350px;
    background-color: #fff;
    box-shadow: 0 0 25px #cac6c6;
    .login-title{
        h3{
            margin: 0px auto 40px;
            text-align: center;
            color: #505458;
        }
    }
    .el-input{
        width: 198px;
    }
    .login-submit{
        margin: 10px auto 0 130px;
    }
}
</style>