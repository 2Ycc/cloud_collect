<template>
  <el-form>
    <div class="collect-container">
      <div class="collect-header">
        <a href="#">Favorite</a>
      </div>
      <div class="collect-main">
        <div class="collect-show1">
          <div class="collect-logo">
            <a :href="collections.url" target="_blank"><img :src="collections.url+'/favicon.ico'" width="84" height="60" alt="LOGO"/></a>
          </div>
          <div class="collect-title">
            <h4>{{collections.title}}</h4>
          </div>
        </div>
        <div class="collect-show2">
          <div style="margin-bottom: 5px;float: right"><span>收藏备注</span></div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="可以添加收藏备注"
            v-model="collections.description">
          </el-input>
        </div>
        <el-checkbox v-model="checked">是否私密</el-checkbox>
        <div class="collect-show3">
          <p style="text-align: center;font-size: 15px">选择一个收藏夹</p>
          <div class="collect-favorite">
            <el-radio v-model="collections.radio"
                      :key="item.favoriteId"
                      v-for="item in collections.favorite"
                      :label="item.favoriteId" border>
              {{item.favoriteName}}
            </el-radio>
          </div>
        </div>

        <div class="collect-show4">
          <p style="text-align: center;font-size: 15px">选择收藏类型</p>
          <div class="collect-favorite">
            <el-select v-model="collections.value" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in collections.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="collect-submit">
          <el-button type="primary" @click="submit">提交收藏</el-button>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>

import {Message} from "element-ui";

export default {
  created() {

  },
  methods: {
    submit: function (){
      Message.success('提交')
    }
  },
  data() {
    return {
      collections: {
        description: '123',
        title: '组件 | Element',
        url: 'https://www.bilibili.com/',
        checked: false,
        radio: '',
        favorite: [{
          favoriteName: '好康的',
          favoriteId: 1
        }, {
          favoriteName: '好玩的',
          favoriteId: 2
        }, {
          favoriteName: 'CO2',
          favoriteId: 3
        }, {
          favoriteName: 'H20',
          favoriteId: 4
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      }
    }
  }
}
</script>


<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
.collect-container{
  margin: 30px auto;
  width: 330px;
}
.collect-header{
  text-align: center;
  text-decoration: none;
  border-radius: 2px;
  height: 21px;
  padding: 10px 15px;
  background-color: #1f2d3d;
}
.collect-header a{
  font-size: 14px;
  color: #fff;
  text-decoration: none;
}
.collect-main{
  background-color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 15px;
}
.collect-title{
  width: 65%;
  word-wrap: break-word;
  word-break: break-all;
  float: left;
  overflow: hidden;
}
.collect-show1{
  height: 20%;
}
.collect-show2{
  margin-bottom: 5px;
  color: #909399;
  font-size: 12px;
}
.collect-logo{
  margin-right: 10px;
  width: 30%;
  float: left;
}
.collect-favorite{
  margin-top: 10px;
}
.el-radio{
  font-size: 10px;
  margin: 10px 10px 0 0 !important;
  width: 130px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.collect-submit{
  margin-top: 20px;
  text-align: center;
}
</style>

