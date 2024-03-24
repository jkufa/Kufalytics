<script setup lang="ts">
  const currentSite = 'kufa.io';

  const dropdownOptions = [
    'Today',
    'Last 30 days',
    'Month to date',
    'Last 12 months',
    'Year to date',
    'All time',
  ]
</script>


<template>
  <ClientOnly>
    <NuxtLayout name="dashboard">
      <div class="flex justify-between items-center">
        <span class="font-bold text-xl">😈 {{ currentSite }}</span>
        <Dropdown label="Month to date" :items="dropdownOptions" />
      </div>
      <VisitorsChart />
      <LocationsChart />
    </NuxtLayout>
  </ClientOnly>
</template>