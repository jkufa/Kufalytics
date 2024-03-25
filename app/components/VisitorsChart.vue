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
import { useVisitorsStore } from '~/utils/stores/visitors';
  use([
    CanvasRenderer,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    LineChart,
  ]);

  const visitorsData = useVisitorsStore();
  visitorsData.$subscribe(() => {
    categories.value = visitorsData.getCategoryData();
    views.value = visitorsData.getViewData();
    totalViews.value = views.value.reduce((acc, curr) => acc + curr);
  });

  let categories = ref(visitorsData.getCategoryData());
  let views = ref(visitorsData.getViewData());
  let totalViews = ref(views.value.reduce((acc, curr) => acc + curr));

  const option = ref({
    tooltip: {
      formatter: function(params: TooltipParams) {
        return `
          <div class="flex flex-col gap-1 text-text">
            <span class="text-text">
              <span class="font-bold text-md">${params.value.toLocaleString('en-us')}</span>
              visitors
              </span>
            <span class="opacity-60 -mb-1">${params.name}</span>
          </div>
          `;
       },
      borderColor: 'white'
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: views,
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
      left: 40,
      right: 0,
      top: 32,
      bottom: 32,
    },
    animationEasing: 'cubicInOut',
    animationDuration: 1000,
  });
</script>

<template>
  <ChartContainer>
    <template v-slot:header>
      <div class="text-text">
        <p class="uppercase opacity-60 font-bold text-xs">Total Unique Visitors</p>
        <p class="font-black text-xl">{{ totalViews.toLocaleString('en-US') }}</p>
      </div>
    </template>
    <template v-slot:graph>
      <v-chart :option="option" autoresize />
    </template>
  </ChartContainer>
</template>