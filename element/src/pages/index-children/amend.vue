<template>
  <div style="text-align：left;">
    <el-breadcrumb separator="/" style="padding: 0px 0 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="javascript:void(0)">修改密码</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <h2>编号</h2>
    <el-input placeholder="请输入内容" v-model="date[0].init" :disabled="true"></el-input>
    <h2>账户</h2>
    <el-input placeholder="请输入内容" v-model="date[0].user" :disabled="true"></el-input>
    <h2>密码</h2>
    <el-input placeholder="请输入内容" v-model="date[0].password" :disabled="false"></el-input>
    <el-button
      type="button"
      @click="open"
      style="display:block; margin: 20px auto;"
    >确定修改</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: [
        {
          user: "",
          password: "",
          init: ""
        }
      ],
      oldpass: ""
    };
  },
  beforeMount() {
    let user = sessionStorage.getItem("user");
    let str = `http://47.113.87.206:8802/user?user=${user}`;
    this.axios.get(str).then(response => {
      this.date = response.data;
      this.oldpass = response.data[0].password;
    });
  },
  methods: {
    open() {
      this.$confirm("修改密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(this.date[0].password, this.oldpass);
          if (isNaN(this.date[0].password)) {
            this.$message({
              type: "info",
              message: "密码只能为数字!"
            });
          } else if (this.date[0].password == this.oldpass) {
            this.$message({
              type: "info",
              message: "没有任何修改!"
            });
          } else {
            let str = `http://47.113.87.206:8802/upmm?user=${this.date[0].user}&pass=${this.date[0].password}`;
            this.axios.get(str).then(response => {
              console.log(response.data);
              if (response.data == 1) {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
              } else {
                console.log("炸了！");
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
</style>