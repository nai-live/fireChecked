<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <img src="../assets/timg1.png" />学生管理系统
            </div>
          </el-col>
          <el-col :span="12" style="text-align: right; padding-top: 8px; ">
            <el-avatar :size="40" :src="circleUrl"></el-avatar>

            <el-dropdown @command="handleCommand">
              <span
                class="el-dropdown-link"
                style="font-size: 20px; position: relative; top:-13px; padding-left: 10px;"
              >
                {{user}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personal">个人信息</el-dropdown-item>
                <el-dropdown-item command="amend">修改密码</el-dropdown-item>
                <el-dropdown-item command="goon" style="color: red;">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="160px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="rgba(0,0,0,0)"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item
              index="total"
              @click="handleOpen"
              :class="(color=='total')?'is-active color':''"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">全部成员</span>
            </el-menu-item>
            <el-menu-item
              index="personal"
              @click="handleOpen"
              :class="(color=='personal')?'is-active color':''"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item
              index="amend"
              @click="handleOpen"
              :class="(color=='amend')?'is-active color':''"
            >
              <i class="el-icon-setting"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>
              <el-menu-item
              index="cheacked"
              @click="handleOpen"
              :class="(color=='cheacked')?'is-active color':''"
            >
              <i class="el-icon-setting"></i>
              <span slot="title">五子棋</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 内容区域 -->
        <el-main :style="ma_sty">
          <router-view style="margin:auto" @setUser="setuser" @goIndex="goIn"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  beforeMount() {
    let hei = window.innerHeight;
    this.ma_sty = `height:${hei - 60}px; padding:  20px`;
    this.user = sessionStorage.getItem("user");
  },
  data() {
    return {
      ma_sty: "height:30px",
      open: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      user: "",
      color: 0
    };
  },
  beforeCreate() {},
  methods: {
    handleCommand(command) {
      if (command != "goon") {
        if (command !== this.color) {
          this.$router.push("./" + command);
          this.color = command;
        }
      } else {
        sessionStorage.removeItem("user");
        this.$router.push("./register");
      }
    },
    handleOpen(key) {
      // console.log(key);
      if (this.color != key.index) {
        this.open = key.index;
        this.$router.push("./" + key.index);
        this.color = key.index;
      }
    },
    setuser(data) {
      this.user = data;
      console.log(this.user);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goIn(data) {  //用color值来控制页面条状，回到首页控制color为index
      this.color = data;
    }
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  line-height: 40px;
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

.el-menu-item.is-active {
  color: #303133;
}
.el-menu-item.is-active i {
  color: #909399;
}
.el-menu-item.is-active.color i {
  color: #409eff;
}
.el-menu-item.is-active.color {
  color: #409eff;
}
.el-menu-item.is-active.color::after {
  transition: 1s;
  content: "";
  display: block;
  width: 140px;
  height: 2px;
  background-color: rgba(28, 126, 224, 0.6);
  position: relative;
  top: -3px;
  left: -20px;
}
/* ----------------------------------------------------------------------------------------- */
.el-header img {
  width: 28px;
  margin-right: 10px;
}

.el-header > span {
  text-align: right;
}

.el-header::after {
  content: "";
  display: block;
  clear: both;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu {
  top: 30px;
}
</style>