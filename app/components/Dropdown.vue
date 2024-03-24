<script setup lang="ts" generic="T">
  const props = defineProps<{
    label: string,
    items: T[],
    /**
	  * The property of the item to use as the label. If null, the item itself will be used.
	  * @default null
	  */
    propLabel?: keyof T
  }>();
  const chevronDownPath = 'M17 10.4L12 14.9L7 10.4';
  let isActive = ref(false);
  const selected = ref(props.items[0]);

  console.log(selected)
  
  function handleClick() {
    isActive.value = !isActive.value;
  }
</script>

<template>
  <div class="inline-block w-fit text-sm text-text">
    <button class="bg-white px-4 h-9 min-w-48 justify-between rounded-[3px] hover:cursor-pointer hover:bg-stonier flex items-center gap-2 transition-colors"
    :class="{ '!bg-stonier': isActive }"
      @click="handleClick"
    >
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
          width="24"
          height="24"
          class="translate-x-1"
        >
        <path :d="chevronDownPath" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none" />
        </svg>
      </i>
    </button>
    <Transition>
    <div v-if="isActive" class="absolute top z-10 mt-2">
        <ListBox v-model:is-open="isActive" :items="items" v-model:selected="selected"/>
      </div>
    </Transition>
  </div>
</template>