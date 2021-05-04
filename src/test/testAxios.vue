<!--<template>-->
<!--  <div>-->
<!--    <el-button @click="testGet">测试GET方法</el-button>-->
<!--    <el-button @click="testPost">测试POST方法</el-button>-->
<!--  </div>-->
<!--</template>-->


<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  methods: {-->
<!--    testGet: function (){-->
<!--      axios.get('http://localhost:8080/api/user/getStudent',{},{-->

<!--      }).then(res=>{-->
<!--        console.log(res)-->
<!--      }).catch(error=>{-->
<!--        console.log(error)-->
<!--      })-->
<!--    },-->
<!--    testPost: function (){-->
<!--      axios.post('http://localhost:8080/api/user/login',{  },{-->
<!--          headers: {-->
<!--            contentType : 'application/json',-->
<!--            token: ''-->
<!--          }-->
<!--      }).then(res=>{-->
<!--        console.log(res)-->
<!--      }).catch(error=>{-->
<!--        console.log(error)-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      loginForm: {-->
<!--        username: 'closer',-->
<!--        password: 'closer'-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--</script>-->




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
        <el-button plain v-on:click="auth()">验证</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

import {Message} from "element-ui";

export default {
  name: "testAxios",
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

    }
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$myAjax('/user/login', 'post', this.form, (res) => {
            Message.success('123')
            // this.$toast(res.msg,{
            //   position: 'top',
            //   duration: 3000,
            //   wordWrap: false,
            // });
            if (res.code===200){
              window.localStorage.setItem('token',res.token);
            }
            console.log(res);
          },'req');
        }
      });
    },
    auth(){
      this.$myAjax('/user/unCode', 'get',{}, (res) => {
        this.$toast(res.msg);
        console.log(res);
      },'rep');
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
  top: 30%;
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


