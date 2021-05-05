<template>
  <el-container class="home-container">
    <el-menu default-active="1-1"
             background-color="#304156"
             text-color="#f4f4f5"
             :unique-opened=true
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse">

      <a href="#"><div class="brand-logo"><img style="margin-top: 10px" src="../assets/logo/logo.png" :width="img.width" :height="img.height" alt="img"/></div></a>
<!--      头像-->
      <div class="head-logo">
        <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <div>
          <span style="font-size: 12px;color: #7D848F" :hidden="isCollapse">欢迎：{{username}}</span>
        </div>
      </div>
      <!-- 一级菜单-->
      <el-menu-item index="1">
        <!-- 一级菜单模板区-->
          <!-- 图标-->
          <i class="el-icon-s-home"></i>
          <!-- 文本-->
          <span slot="title">首页</span>
      </el-menu-item>
      <!-- 一级菜单-->
      <el-submenu index="2">
        <!-- 一级菜单模板区-->
        <template slot="title">
          <!-- 图标-->
          <i class="el-icon-folder"></i>
          <!-- 文本-->
          <span slot="title">收藏夹</span>
        </template>
          <!-- 二级菜单-->
        <el-menu-item index="2-0">+新建收藏夹</el-menu-item>
          <el-menu-item v-for="item in favorite"
                        :key="item.favoriteId"
                        :index="'2-'+item.favoriteId">
            {{item.favoriteName}}
          </el-menu-item>
      </el-submenu>

      <el-menu-item index="3">
        <!-- 一级菜单模板区-->
        <!-- 图标-->
        <i class="el-icon-discover"></i>
        <!-- 文本-->
        <span slot="title">逛一逛</span>
      </el-menu-item>

      <el-menu-item index="4">
        <!-- 一级菜单模板区-->
        <!-- 图标-->
        <i class="el-icon-s-cooperation"></i>
        <!-- 文本-->
        <span slot="title">网页收藏工具</span>
      </el-menu-item>

      <el-menu-item index="5">
        <!-- 一级菜单模板区-->
        <!-- 图标-->
        <i class="el-icon-download"></i>
        <!-- 文本-->
        <span slot="title">收藏导出</span>
      </el-menu-item>

      <el-menu-item index="6">
        <!-- 一级菜单模板区-->
        <!-- 图标-->
        <i class="el-icon-upload2"></i>
        <!-- 文本-->
        <span slot="title">收藏导入</span>
      </el-menu-item>

    </el-menu>

    <el-container>
      <el-header>
        <a href="#" @click="collapse"><i :class="this.switch"></i></a>
        <el-button @click="logout">退出</el-button>
      </el-header>
      <el-main>Main</el-main>
    </el-container>

  </el-container>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
.brand-logo{
  text-align: center;
  height: 60px;
  -webkit-box-shadow: 0 0 13px 0 rgb(0 0 0 / 20%);
  box-shadow: 0 0 13px 0 rgb(0 0 0 / 20%);
}
.head-logo{
  margin-top: 20px;
  height: 10%;
  text-align: center;
}
.el-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 12%);
  box-shadow: 0 1px 4px rgb(0 21 41 / 12%);
}
.home-container{ height: 100%; }
.el-menu-item.is-active { background-color: #1f2d3d !important; }
.el-menu-vertical-demo:not(.el-menu--collapse) { width: 200px; }
</style>

<script>
export default {
  data() {
    return {
      username: 'Closer',
      switch: 'el-icon-s-fold',
      favorite: [{
        favoriteId: '1',
        favoriteName: 'CO2'
      }, {
        favoriteId: '2',
        favoriteName: 'H2O'
      }, {
        favoriteId: '3',
        favoriteName: '好康的'
      }],
      isCollapse: false,

      img: {
        width: '',
        height: ''
      }
    };
  },
  methods: {
    logout(){
      window.localStorage.clear()
      this.$toast("退出")
      this.$router.push("/login")
    },
    collapse(){
      this.isCollapse = !this.isCollapse
      if (this.isCollapse){
        this.switch = 'el-icon-s-unfold'
        this.img.height = 55
        this.img.height = 22
      }else {
        this.switch = 'el-icon-s-fold'
        this.img.height = ''
        this.img.height = ''
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
