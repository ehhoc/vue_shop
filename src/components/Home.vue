<template>
  <div>
    <!-- 一个灰色按钮 -->
   <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {

methods:{
  logout(){
    // 清空sessionStorage中所有的数据，包括token 这里就是为了清除token，从而实现退出home界面
    window.sessionStorage.clear()
    // this.$route是当前活跃的路由 this.$router则一般用于路由间跳转，这俩有质的区别
    this.$router.push('/login')
    
  }
}
}
</script>

<style>

</style>