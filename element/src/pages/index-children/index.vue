<template>
  <div id="myChart" :style="{width: '700px', height: '600px'}"></div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.drawLine();
    this.$emit("goIndex","index")
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      let xAxis = {
        data:[]
      };
      let series = [
        {
          name: "平均",
          type: "bar",
          data: []
        }
      ];
      let str = `http://47.113.87.206:8802/int`;
      this.axios.get(str).then(response => {
        updata(response.data);
        // console.log(series)
        myChart.setOption({
          title: { text: "服务器访问情况" },
          tooltip: {},
          xAxis: xAxis,
          yAxis: {},
          series: series
        });
      });
      function updata(data) {
        let arr = [];
        let arr_num = [];
        // console.log(data.length)
        for (let i = 0; i < data.length; i++) {
          arr[i] = data[i].user;
          arr_num[i] = data[i].init;
        }
        xAxis.data = arr;
        series[0].data = arr_num;
      }
    }
  }
};
</script>

<style scoped>
</style>