<template>
  <div>
    <el-container>
      <el-header>
        <img src="../assets/timg1.png" />学生管理系统
      </el-header>
      <el-main :style="ma_sty">
        <!-- ++++++表单开始++++++ -->
        <div class="form_box">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="user">
              <el-input v-model="ruleForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <!-- <el-button @click="resetForm('ruleForm')">登录</el-button> -->
            </el-form-item>
            <a
              href="javascript:void(0)"
              @click="resetForm('ruleForm')"
              style="color: blue;padding-left:100px;"
            >已有账号点这里</a>
          </el-form>
        </div>
        <!-- +++++表单结束+++++ -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      let reg = /^[0-9a-z]{0,16}$/
      console.log(reg.test(value))
      if(!reg.test(value)){
        return callback(new Error("用户名只能由小写字母和数字组成"));
      }
      callback();
      //   setTimeout(() => {
      //     if (!Number.isInteger(value)) {
      //       callback(new Error("请输入数字值"));
      //     } else {
      //       if (value < 18) {
      //         callback(new Error("必须年满18岁"));
      //       } else {
      //         callback();
      //       }
      //     }
      //   }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          console.log(this.$refs);
          this.$refs.ruleForm.validateField("checkPass");
        }
        if (isNaN(value)) {
          callback(new Error("密码只能由数字组成"));
        } else {
          callback();
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ma_sty: "height:30px",
      //表达数据
      ruleForm: {
        pass: "",
        checkPass: "",
        user: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        user: [{ validator: checkUser, trigger: "blur" }]
      }
      //-------------
    };
  },
  beforeMount() {
    let hei = window.innerHeight;
    this.ma_sty = `height:${hei - 60}px; padding: ${(hei - 376) / 2}px 20px`;
  },
  methods: {
    submitForm(formName) {
      //表单 提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          let str = `http://47.113.87.206:8802/login?user=${this.ruleForm.user}&pass=${this.ruleForm.pass}`;
          this.axios.get(str).then(response => {
            console.log(response.data);
            if (response.data == 1) {
              this.$message({
                message: "恭喜你，注册成功!",
                type: "success"
              });
              this.$router.push("./register");
            } else {
              this.$message.error("该用户名已被注册!");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //表单  注册
      this.$router.push("./register");
    }
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-header img {
  width: 28px;
  margin-right: 10px;
}
.el-header {
  font-size: 23px;
}
.form_box {
  width: 400px;
  margin: auto;
}
</style>