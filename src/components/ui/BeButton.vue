<template>
  <button @click="onClick">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
const emit = defineEmits(['click'])
const onClick = () => emit('click')
</script>

<style scoped lang="scss">
button {
  cursor: pointer;
  background-color: transparent;
  border: 1px solid rgba(255, 174, 71, 0.8);
  font-size: 1.4rem;
  line-height: 1.7rem;
  color: var(--vt-c-white);
  border-radius: 1.5rem;
  padding: 1.5rem 2rem;
}
</style>
