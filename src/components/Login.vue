<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box"><img src="../assets/logo.png" alt="" /></div>

      <!-- 登录表单区域    :model='loginForm' 动态绑定loginForm的登录数据-->
      <!-- refs相当于给当前标签起了一个名字，用这个名字可以直接获取到这个元素并操作它里面的数据 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        class="login_form"
        :rules="loginFormRules"
      >
        <!-- 用户名  prop="username"登录的验证规则生效-->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <!-- show-password写成type='password'一样的效果 -->
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getLoginMultidata} from '../network/login'

export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 这是表单的登录验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          // required: true代表是必填项   message: '请输入登录名称' 这是提示消息  trigger: 'blur'文本框失去焦点时触发这次行为
          { required: true, message: "请输入登录名称", trigger: "blur" },
          //  min: 3, max: 5 用户名长度在3-10
          {
            min: 2,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        //   验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "change" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      // 利用refs绑定表单项，用来获取表单来调用resetFields函数
      // resetFields：对该表单项进行重置，将其值重置为初始值并移除校验结果
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // vaild是回调参数 返回false、true 来判断表单项被校验之后是否符合规则
      this.$refs.loginFormRef.validate(async (vaild) => {
        // 当vaild为false时返回，不发起请求；也就是说当vaild为true时，不return，直接发起请求
        if (!vaild) return;
        // 将loginForm传递进来才可以当成参数传递 不然数据传递不进来，这一步我一直忘了
        const { username, password } = this.loginForm
        getLoginMultidata(username,password).then((res) => {
          if (res.meta.status !== 200){
            //  message是elementui中弹窗方法
            return this.$message.error("登录失败");}
          this.$message.success("登录成功");

        // 保存数据语法：sessionStorage.setItem("key", "value");
        // sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据
        // 用sessionStorage创建一个值，token是值名，res.data.token是值
           window.sessionStorage.setItem("token", res.data.token);

        // $router是vue-router自定义的属性，$router中有push方法，可以指定点击路由后的去向
        // 对应首页按钮是button直接写的，则要写一下方法进行路由跳转。this.$router.push() 可以通过修改url实现路由跳转。
             this.$router.push("/home");
        });



        // 这里是老师没有封装网络请求的写法 在此上面我已经封装了axios用于网络请求
        // const {data:res} = await this.$http.post("login",this.loginForm)
        //   if(res.meta.status !== 200)
        //   message是elementui中弹窗方法
        //   return this.$message.error("登录失败")
        // this.$message.success("登录成功")
      });
    },
  },
};
</script>

<style scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  /* 这三个句子结合 才能让盒子在页面正中间 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  width: 110px;
  height: 110px;
  border: 1px solid #eee;
  /* 方框变圆 */
  border-radius: 50%;
  /* 图片和边框之间有间距 */
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  /* 这里是left和top相对于盒子的宽高130px再移动50%的距离 */
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #eee;
}

.btns {
  display: flex;
  /* 右对齐 */
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  /*  box-sizing: border-box就是将border和padding数值包含在width和height之内，
这样的好处就是修改border和padding数值盒子的大小不变。*/
  box-sizing: border-box;
}
</style>