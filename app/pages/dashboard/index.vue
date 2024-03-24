<script setup lang="ts">
  const currentSite = 'kufa.io';

  const dropdownOptions = [
    // 'Today',
    'Last week',
    // 'Last 30 days',
    'Month to date',
    // 'Last 12 months',
    // 'Year to date',
    'All time',
  ]

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
        <Dropdown label="Month to date" :items="dropdownOptions" />
      </div>
      <VisitorsChart />
      <LocationsChart />
    </NuxtLayout>
  </ClientOnly>
</template>