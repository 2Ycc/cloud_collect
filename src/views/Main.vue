<template>

<div>
  <el-header style="padding: 0px">
    <NavMenu></NavMenu>
  </el-header>
  <el-col :span="24">
    <SideNav></SideNav>
  </el-col>

</div>


</template>

<script>
import SideNav from "../components/SideNav";
import NavMenu from "../components/NavMenu";

export default {
  name: 'Main',
  components: {
    SideNav,
    NavMenu
  },
  data() {
    return {
      num: 1
    };
  },
};
</script>
