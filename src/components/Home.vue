<template>
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../assets/heima.png" alt="">
          <span>电商后台管理系统</span>
        </div>
        <el-button class="btn" type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">Aside</el-aside>
        <!-- 右侧内容主体 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      // 清空sessionStorage中所有的数据，包括token 这里就是为了清除token，从而实现退出home界面
      window.sessionStorage.clear();
      // this.$route是当前活跃的路由 this.$router则一般用于路由间跳转，这俩有质的区别
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.home-container{
  height: 100%;
}
.el-header{
  background-color: #373d41;
  display: flex;
  /* flex布局中的两端对齐 */
  justify-content: space-between;
}
.el-aside{
  background-color: #333744;
}
.el-main{
  background-color: #eaedf1;
}
</style>