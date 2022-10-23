<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="user">
            <img src="@/assets/images/user.png" alt="" />
            <div class="user-info">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登陆时间：<span>2022-10-17</span></p>
            <p>上次登陆地点：<span>广州</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 460px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <el-card
            :body-style="{ display: 'flex', padding: 0 }"
            v-for="item in countData"
            :key="item.name"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ backgroundColor: item.color }"
            ></i>
            <div class="detail">
              <p class="price">¥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card id="homeLineEcharts" style="height: 280px"> </el-card>

        <div class="graph">
          <el-card id="homeBarEcharts"></el-card>
          <el-card id="homePieEcharts"></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "@/api";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [],
    };
  },
  mounted() {
    getData()
      .then(({ data }) => {
        const { tableData } = data.data;
        const { countData } = data.data;
        this.tableData = tableData;
        this.countData = countData;
        // console.log(data);

        // 折线图
        // 基于准备好的dom，初始化echarts实例
        const lineEcharts = echarts.init(
          document.getElementById("homeLineEcharts")
        );
        // 指定图表的配置项和数据。
        let lineEchartsOption = {};

        // 解构数据
        const { orderData, userData,videoData } = data.data;
        // 处理x轴 和 图例
        const lineEcharts_xAxis = orderData.date;
        const lineEcharts_legend = Object.keys(orderData.data[0]);
        // console.log(orderData);

        lineEchartsOption.xAxis = {
          data: lineEcharts_xAxis,
        };
        lineEchartsOption.yAxis = {};
        lineEchartsOption.legend = {
          data: lineEcharts_legend,
        };
        lineEchartsOption.series = [];

        lineEcharts_legend.forEach((key) => {
          lineEchartsOption.series.push({
            name: key,
            data: orderData.data.map((item) => item[key]),
            type: "line",
          });
        });
        // console.log(lineEchartsOption);
        // 使用刚指定的配置项和数据显示图表。
        lineEcharts.setOption(lineEchartsOption);

        // 柱状图

        const barEcharts = echarts.init(
          document.getElementById("homeBarEcharts")
        );

        let barEchartsOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          // grid 组件离容器左侧的距离
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: userData.map((item) => item.date),
            // 坐标轴轴线相关设置
            axisLine: {
              // 坐标轴线线的颜色
              lineStyle: {
                color: "#17b3a3",
              },
            },
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              // 设置成 0 强制显示所有标签
              interval: 0,
              // 刻度标签文字的颜色
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#784327",
                },
              },
            },
          ],
          // 调色盘颜色列表。
          // 如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色。
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              type: "bar",
              data: userData.map((item) => item.new),
            },
            {
              name: "活跃用户",
              type: "bar",
              data: userData.map((item) => item.active),
            },
          ],
        };

        // console.log(userData);
        /* const barEcharts_xAxis = userData.map(item=>item.date)
        const barEcharts_yAxis={}
        barEchartsOption.xAxis = {
          data: barEcharts_xAxis
        }
        barEchartsOption.yAxis = barEcharts_yAxis
        barEchartsOption.series= [
          {
            name:'新增用户',
            type:'bar',
            data:userData.map(item=>item.new)
          },
          {
            name:'活跃用户',
            type:'bar',
            data:userData.map(item=>item.active)
          }
        ] */
        barEcharts.setOption(barEchartsOption);

        // 饼状图
        const pieEcharts = echarts.init(
          document.getElementById("homePieEcharts")
        );
        let pieEchartsOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              type:'pie',
              data:videoData
            }
          ],
        };
        pieEcharts.setOption(pieEchartsOption)
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      margin-left: 60px;
      color: #666;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
    .icon {
      font-size: 30px;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: #fff;
    }
    .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 15px;
      .price {
        font-size: 30px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
      }
      .desc {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card {
    width: 48%;
    height: 260px;
  }
}
</style>