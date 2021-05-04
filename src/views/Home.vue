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
      <!-- 一级菜单-->
      <el-submenu index="1">
        <!-- 一级菜单模板区-->
        <template slot="title">
          <!-- 图标-->
          <i class="el-icon-location"></i>
          <!-- 文本-->
          <span slot="title">导航一</span>
        </template>
          <!-- 二级菜单-->
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>

    <el-container>
      <el-header>
        <a class="el-button" @click="collapse"><i class="el-icon-menu"></i></a>
        <el-button @click="logout">退出</el-button>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<!--加上scoped能够防止样式之间的冲突-->
<style scoped>
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
      isCollapse: false
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
