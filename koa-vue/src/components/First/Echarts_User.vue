<template>
  <div>
    <div id="myChart" :style="{ width: '800px', height: '800px'}"></div>
    <div id="user" :style="{ width: '600px', height: '600px' }"></div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts");

export default {
  name: "Echarts_User",
  methods: {},
  mounted() {
    var dom = document.getElementById("myChart");
    var myChart = echarts.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
    var app = {};

    var option;

    option = {
      title: {
        text: "花驿小栈后台用户数据",
        subtext: "饼状图",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1, name: "管理员" },
            { value: 7, name: "普通用户" },
            { value: 2, name: "商家" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    var user = document.getElementById("user");
    var myChartuser = echarts.init(user);
    var option1;

    option1 = {
		   title: {
			text: '用户数据变化',
			subtext: '折线图',
			left: 'center'
		},
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["2021.10", "2021.11", "2021.12", "2022.1", "2022.2", "2022.3", "2022.4"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [1, 2,1, 1, 0, 2, 1],
          type: "line",
          areaStyle: {},
        },
      ],
    };

    option1 && myChartuser.setOption(option1);

    if (option && typeof option === "object") {
      myChart.setOption(option);
    }

    window.addEventListener("resize", myChart.resize);
  },
};
</script>

<style>
#myChart,#user{
	float: left;
}
</style>