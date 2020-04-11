<template>
  <div>
    <el-breadcrumb separator="/" style="padding: 0px 0 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="javascript:void(0)">全部成员</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 编辑弹框 -->
    <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="margin: auto; width: 400px;">
        <el-form-item label="账号" :label-width="formLabelWidth" style="width: 300px;">
          <el-input v-model="form.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" style="width: 300px;">
          <el-input v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogYes">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增弹框 -->
    <el-dialog title="新增用户信息" :visible.sync="dialogFormVisibl">
      <el-form :model="forme" style="margin: auto; width: 400px;">
        <el-form-item label="账号" :label-width="formLabelWidth" style="width: 300px;">
          <el-input v-model="forme.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" style="width: 300px;">
          <el-input v-model="forme.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibl = false">取 消</el-button>
        <el-button type="primary" @click="addYes">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 表格位置 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="账号" width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="280">
        <template slot-scope="scope">
          <i class="el-icon-key"></i>
          <span style="margin-left: 10px">{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.password1 }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格位置 -->

    <el-button
      type="text"
      @click="dialogFormVisibl = true"
      style="background: #b3c0d1; padding: 12px 40px; margin: 10px;"
    >
      <i class="el-icon-circle-plus-outline"></i>新增
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        user: "", //第一个框
        pass: "", //第二个框
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        olduser: ""
      },
      //新增
      dialogTableVisibl: false,
      dialogFormVisibl: false,
      forme: {
        user: "", //第一个框
        pass: "", //第二个框
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        olduser: ""
      },
      //新增
      formLabelWidth: "120px"
    };
  },
  created() {
    this.updata();
  },
  methods: {
    updata() {
      let str = `http://47.113.87.206:8802/int`;
      this.axios.get(str).then(res => {
        this.tableData = res.data;
      });
    },
    handleEdit(index, row) {
      console.log(index, row.user);
      this.form.olduser = row.user;
      this.form.user = row.user;
      this.form.pass = row.password;
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let str = `http://47.113.87.206:8802/dele?user=${row.user}`;
          this.axios.get(str).then(res => {
            if (res.data == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              if (row.user == sessionStorage.getItem("user")) {
                sessionStorage.removeItem("user");
                this.$router.push("./register");
              }
              this.tableData.splice(index,1)
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑确定
    dialogYes() {
      this.$confirm("此操作将修改用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          let reg = /^[0-9a-z]{0,16}$/;
          if (!reg.test(this.form.user) || isNaN(this.form.pass)) {
            this.$message({
              message: "账号只能由数字和小写字母组成，密码为数字!",
              type: "success"
            });
          }else{
            let str = `http://47.113.87.206:8802/update?olduser=${this.form.olduser}&user=${this.form.user}&pass=${this.form.pass}&`;
          this.axios.get(str).then(res => {
            // console.log(res.data); //接收到返回值1即执行完毕
            if (res.data == 1) {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              if (this.form.olduser == sessionStorage.getItem("user")) {
                sessionStorage.setItem("user", this.form.user);
                // location.reload();
                this.$emit("setUser", this.form.user);
              }
              this.dialogFormVisible = false;
              this.updata();
            } else {
              this.$message({
                type: "info",
                message: "修改失败，用户名重复"
              });
            }
          });
          }

          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
          this.dialogFormVisible = false;
        });
    },
    addYes() {
      let reg = /^[0-9a-z]{0,16}$/;
      if (!reg.test(this.forme.user) || isNaN(this.forme.pass)) {
        this.$message({
          message: "账号只能由数字和小写字母组成，密码为数字!",
          type: "success"
        });
      } else {
        let str = `http://47.113.87.206:8802/login?user=${this.forme.user}&pass=${this.forme.pass}`;
        this.axios.get(str).then(response => {
          console.log(response.data);
          if (response.data == 1) {
            this.$message({
              message: "设置成功!",
              type: "success"
            });
            this.dialogFormVisibl = false;
            this.updata();
          } else {
            this.$message.error("该用户名已被注册!");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.el-table thead {
  line-height: 40px;
  color: #909399;
  font-weight: 500;
}
.has-gutter tr,
.has-gutter th {
  height: 30px;
}
.el-dialog__body {
  width: 400px;
  margin: auto;
}
</style>