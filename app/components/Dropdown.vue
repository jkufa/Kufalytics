<script setup lang="ts" generic="T">
  defineProps<{
    label: string,
    items: T[],
    selected?: T,
    /**
	  * The property of the item to use as the label. If null, the item itself will be used.
	  * @default null
	  */
    propLabel?: keyof T
  }>();
  const chevronDownPath = 'M17 10.4L12 14.9L7 10.4';
</script>

<template>
  <button class="bg-white px-4 h-9 text-text rounded-[3px] hover:cursor-pointer hover:bg-stonier flex items-center gap-2 transition-colors">
    <span>
      <template v-if="selected != null">
        <template v-if="propLabel != null">
          {{ selected[propLabel] }}
        </template>
        <template v-else>
          {{ selected }}
        </template>
      </template>
      <template v-else>
        {{ label }}
      </template>
    </span>
    <i>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        class="translate-x-1"
      >
			<path :d="chevronDownPath" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none" />
      </svg>
    </i>
  </button>
</template>