<template>
  <div>
    <span style="color: #909399; font-size: 20px">新建收藏夹</span>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="5">
          <el-input
            show-word-limit
            maxlength="10"
            placeholder="请输入内容"
            v-model="form.favoriteName"
            clearable>
          </el-input>
      </el-col>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-row>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>

<script>
import {Message} from "element-ui";
import Home from "../../views/Home";

export default {
  methods: {
    submit(){
      if (this.favoriteName.trim().length===0){
        Message.error('收藏夹名不能为空')
        return null
      }else {
        this.$myAjax('/favorite/addFavorite?favoriteName='+this.favoriteName, 'get', '1', (res) => {
          if (res.code===200){
            Message.success(res.msg)
            Home.data().favorite = res.data
          }else Message.error(res.msg)
          console.log(res)
        },'req')
      }
    }
  },
  data() {
    return {
      favoriteName: '',
    }
  }
}
</script>
