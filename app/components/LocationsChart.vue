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
  import { BarChart } from 'echarts/charts';
  import { graphic } from 'echarts';

  use([
    CanvasRenderer,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    BarChart,
  ]);

  const option = {
    xAxis: {
    },
    yAxis: {
      data: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7', 'Category 9', 'Category 10']
    },
    series: [{
      itemStyle: {
          color: 'rgb(0, 142, 117)'
        },
        type: 'bar',
        data: [150, 54, 180, 250, 210, 99, 20, 167, 147,].sort((a, b) => a - b) // Example data for the bar chart
    }],
    grid: {
      left: 72,
      top: 32,
      bottom: 32,
    },
  };

</script>

<template>
  <ChartContainer>
    <v-chart :option="option" autoresize />
  </ChartContainer>
</template>