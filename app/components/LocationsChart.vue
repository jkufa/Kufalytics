<script setup lang="ts">
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { GridComponent } from 'echarts/components';
  import { BarChart } from 'echarts/charts';
  import type { ComposeOption } from 'echarts/core';
  import type { BarSeriesOption } from 'echarts/charts';
  import type { GridComponentOption } from 'echarts/components';
import { useVisitorsStore } from '~/utils/stores/visitors';

  use([
    CanvasRenderer,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    BarChart,
  ]);

  type Props = {
    /**
     * Max amount of locations to display
     */
    maxCount: number,
    numberOfDays: number
  };
  const props = withDefaults(defineProps<Props>(), { maxCount: 10 });


  const visitorsData = useVisitorsStore();
  visitorsData.$subscribe(() => {
    categories.value = genCountries(props.maxCount);
    visits.value = genViews(props.maxCount, 10000).sort((a, b) => a - b);
  });
  const categories: Ref<string[]> = ref(genCountries(props.maxCount));
  const visits: Ref<number[]> = ref(genViews(props.maxCount, 10000).sort((a, b) => a - b));

  type EChartsOption = ComposeOption<GridComponentOption | BarSeriesOption>;
  const option: Ref<EChartsOption> = ref({
    tooltip: {
      formatter: function(params: TooltipParams) {
        return `<span class="text-text">
          <span class="font-bold">${params.value.toLocaleString('en-us')}</span>
          visitors</span>`
       },
      borderColor: 'white'
    },
    xAxis: {
    },
    yAxis: {
      type: 'category',
      data: categories,
      show: false
    },
    series: [{
        type: 'bar',
        data: visits,
        itemStyle: {
          color: '#F1F9F7',
          borderRadius: 3
        },
        emphasis: {
          itemStyle: {
            // Color in emphasis state.
            color: '#E0EFEB'
          },
        },
        barCategoryGap: '5%',
        label: {
          show: true,
          position: 'insideLeft', // Change this value to fit your preference
          formatter: '{b}', // Display the category name
          color: '#002D09', // Label text color
          padding: [0, 0, 0, 16]
        }
    }],
    grid: {
      left: 4,
      top: 32,
      bottom: 32,
    },
  });

</script>

<template>
  <ChartContainer>
    <template v-slot:header>
      <div class="text-text">
        <p class="font-black text-xl">Top Locations</p>
      </div>
    </template>
    <template v-slot:graph>
      <v-chart :option="option" autoresize />
    </template>
  </ChartContainer>
</template>