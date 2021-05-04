<template>
  <div class="login_container">
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input suffix-icon="el-icon-user-solid" type="text" placeholder="请输入账号或邮箱地址" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input suffix-icon="el-icon-lock" type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
        <el-button plain v-on:click="register()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import {Message} from "element-ui";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$myAjax('/user/login', 'post', this.form, (res) => {
            // this.$toast(res.msg,{})
            if (res.code===200){
              Message.success(res.msg)
              window.localStorage.setItem('token',res.token)
              // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
              this.$router.push('/home')
            }else Message.error(res.msg)
            console.log(res)
          },'req')
        }
      })
    },
    register(){
      this.$router.push("/register")
    }
  }
}
</script>

<style scoped>
.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  position: absolute;
  left: 50%;
  top: 40%;
  background-color: #fff;
  transform: translate(-50%,-50%);
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
.login_container{
  height: 100%;
  background-color: #f5f7fa;
}
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
