<script setup lang="ts" generic="T">
  const props = defineProps<{
    items: T[],
  }>();
  const selected = defineModel<T>('selected', { required: true});
  const isOpen = defineModel<boolean>('isOpen');

  function handleClick(item: T) {
    selected.value = item;
    isOpen.value = false;
  }
</script>

<template>
  <ul class="list p-2 bg-white rounded-[3px] shadow-md min-w-48 flex flex-col gap-1">
    <li v-for="item in items">
      <button class="p-2 rounded-sm hover:cursor-pointer hover:bg-stonier w-full text-left focus-within:bg-stonier transition-colors"
        @click="handleClick(item)"
      >
        {{ item }}
      </button>
    </li>
	</ul>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition-property: opacity, transform;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: scaleY(1);
  transform-origin: top;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>