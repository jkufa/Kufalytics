<script setup lang="ts">
  import { useVisitorsStore } from '~/utils/stores/visitors';
  const visitorsData = useVisitorsStore();

  const currentSite = 'kufa.io';
  const dropdownOptions = Object.keys(VisitorView).filter((v) => isNaN(Number(v)));
  const label = ref(visitorsData.getView());

  watch(label, (newLabel, _) => {
    visitorsData.setView(VisitorView[newLabel]);
  })

  const domainUrl = 'kufa.io';
  function buildFaviconUrl(domain: string) {
    return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domainUrl}&size=32`;
  }
</script>


<template>
  <ClientOnly>
    <NuxtLayout name="dashboard">
      <div class="flex justify-between items-center mb-4">
        <span class="font-bold text-xl flex gap-1 items-center">
          <img class="w-8" :src="buildFaviconUrl(domainUrl)">
          {{ currentSite }}
        </span>
        <Dropdown :items="dropdownOptions" v-model:selected="label" id="timeframe" />
      </div>
      <VisitorsChart />
      <LocationsChart />
    </NuxtLayout>
  </ClientOnly>
</template>