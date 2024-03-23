<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { graphic } from 'echarts';

use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
]);


const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      itemStyle: {
        color: 'rgb(0, 142, 117)'
      },
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 142, 117, .25)'
          },
          {
            offset: 1,
            color: 'rgb(255, 255, 255, 0)'
          }])
      },
    },
  ],
  grid: {
    left: 32,
    right: 0,
    top: 32,
    bottom: 32,
  },
  animationEasing: 'cubicInOut',
  animationDuration: 1000,
};
</script>

<template>
  <div class="bg-white rounded-md p-8 h-[500px]">
    <p>Chart</p>
    <v-chart :option="option" autoresize />
  </div>
</template>