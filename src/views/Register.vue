<template>
  <div class="login_container">
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎注册</h3>
      <el-form-item label="邮箱" prop="email">
        <el-input suffix-icon="el-icon-message" type="email" placeholder="请输入邮箱地址" @blur="checkEmail()" v-model="form.email"/>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input suffix-icon="el-icon-user-solid" type="text" placeholder="请输入账号" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input suffix-icon="el-icon-lock" type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">注册</el-button>
        <el-button plain v-on:click="toLogin()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "Login",
  data() {
    const email = (rule, value, callback) => {
      const mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      if (rule.required && !value) {
        return callback(new Error('不能为空'))
      }
      if (value) {
        if (!(mal.test(value))) {
          callback(new Error('请输入正确邮箱'))
        } else {
          callback()
        }
      }
    }
      const ifUsernameExist = (rule, value, callback) => {
        if (value) {
          this.$myAjax('/user/ifUsernameExist', 'post', this.form.username, (res) => {
            if (res===1){
              callback(new Error('用户名已存在'))
            }else callback()
          },'req')
        }
      }
    const ifEmailExist = (rule, value, callback) => {
      if (value) {
        this.$myAjax('/user/ifEmailExist', 'post', this.form.email, (res) => {
          if (res===1){
            callback(new Error('邮箱已存在'))
          }else callback()
        },'req')
      }
    }
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'},
          {required: true, validator: ifUsernameExist, trigger: 'blur'}
        ],
        email: [
          {required: true,validator: email, trigger: 'blur'},
          {required: true, validator: ifEmailExist, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (!valid) return null
        else{
          this.$myAjax('/user/register', 'post', this.form, (res) => {
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
    toLogin(){
      this.$router.push("/login")
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
