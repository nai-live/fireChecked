<template>
  <div style="text-align：left;">
    <el-breadcrumb separator="/" style="padding: 0px 0 20px">
      <el-breadcrumb-item :to="{ path: '/' }" >首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="javascript:void(0)">个人信息</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <h2>用户名</h2>
    <el-input placeholder="请输入内容" v-model="data[0].user" :disabled="true"></el-input>
    <h2>密码</h2>
    <el-input placeholder="请输入内容" v-model="data[0].password" :disabled="true"></el-input>
    <h2>用户编码</h2>
    <el-input placeholder="请输入内容" v-model="data[0].init" :disabled="true"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          user: "",
          password: "",
          init: ""
        }
      ]
    };
  },
  beforeMount() {
    let user = sessionStorage.getItem("user");
    let str = `http://47.113.87.206:8802/user?user=${user}`;
    this.axios.get(str).then(response => {
      this.data = response.data;
    });
  },
  methods: {
    
  },
};
</script>

<style scoped>
</style>