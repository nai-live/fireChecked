<template>
  <div style="text-align：left;">
    请输入房间号：
    <input
      :type="obj"
      v-model="houser"
      oninput="value=value.replace(/[^\d]/g,'')"
      :disabled="disable"
    />
    <button @click="oready" :disabled="disable">准备</button>
    <span v-show="disable&&wait">等待另一位玩家准备</span>
    <div v-show="disable" style="width:85vh;margin:auto;">
      <div v-for="(item,index) in cheacked" :key="index">
        <div
          v-for="(item,inindex) in item"
          :key="inindex"
          class="child"
          :class="cla(item)"
          @click="play==oplay?keyDown(index,inindex):''"
        ></div>
        <div style="clear:both;"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      houser: "",
      user: sessionStorage.getItem("user"),
      cheacked: [],
      disable: false,
      obj: "text",
      wait: true,
      play: 0,
      oplay: "",
      url: "http://192.168.1.103:8803/",
      checked: ""
    };
  },
  beforeMount() {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      let arr1 = [];
      for (let j = 0; j < 20; j++) {
        arr1[j] = 0;
      }
      arr[i] = arr1;
    }
    this.cheacked = arr;
  },
  methods: {
    //下棋事件

    keyDown(a, b) {
      let play = this.oplay;
      let cheacked = this.cheacked;
      if (cheacked[a][b] == 1 || cheacked[a][b] == 2) {
        alert("这里已经下过了");
      } else {
        if (play == "play1") {
          cheacked[a][b] = 1;
          play = "play2";
        } else {
          cheacked[a][b] = 2;
          play = "play1";
        }
        console.log(cheacked);
      }
      this.oplay = play;
      this.cheacked = cheacked.concat();
      let chack = "";
      for (let i = 0; i < cheacked.length; i++) {
        for (let j = 0; j < cheacked.length; j++) {
          chack += cheacked[i][j];
        }
      }
      let str = `${this.url}onplay?houser=${this.houser}&checked=${chack}&onplay=${play}`;
      console.log(str);
      this.axios.get(str).then(response => {
        console.log(response.data);
      });
    },
    //进入准备状态
    oready() {
      console.log("准备");
      if (this.houser == "") {
        alert("请输入一个房间号！");
        return;
      }
      this.disable = true;
      let str = `${this.url}ready?name=${this.user}&houser=${this.houser}`;
      this.axios.get(str).then(response => {
        console.log(response.data);

        this.play = response.data;
        setInterval(() => {
          this.msg();
        }, 500);
      });
    },
    //class样式返回
    cla(e) {
      let str = this.cur();
      //   console.log(str)
      if (e == 0) return "" + str;
      if (e == 1) return "black " + str;
      if (e == 2) return "white " + str;
    },
    //用于刷新面板的函数
    msg() {
      let str = `${this.url}int?houser=${this.houser}`;
      this.axios.get(str).then(response => {
        let data = response.data;
        console.log(data);
        
        this.oplay = data.who;
        this.checked = data.checked;
        let num = 0;
        let arr = [];
        for (let i = 0; i < 20; i++) {
          let arr1 = [];
          for (let j = 0; j < 20; j++) {
            arr1[j] = data.checked.substr(num, 1);
            num++;
          }
          arr[i] = arr1;
        }
        this.cheacked = arr;
      });
    },
    //改变鼠标样式
    cur() {
      if (this.play == this.oplay) {
        return "pointer";
      } else {
        return "wait";
      }
    }
  }
};
</script>

<style scoped>
.child {
  float: left;
  width: 4vh;
  height: 4vh;
  border: 1px solid #666;
  margin-left: -1px;
  margin-top: -1px;
}
.black {
  background-color: black;
  border-radius: 50%;
}
.white {
  background-color: white;
  border-radius: 50%;
}
.wait {
  cursor: wait;
}
.pointer {
  cursor: pointer;
}
</style>