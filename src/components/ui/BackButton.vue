<template>
  <button @click="$emit('click')">
    <arrow-right />
  </button>
</template>
<script setup lang="ts">
import ArrowRight from '@/components/icons/ArrowRight.vue'

defineEmits(['click'])
</script>
<style scoped lang="scss">
button {
  border: 0;
  background-color: transparent;
  padding: 0;
  margin: 0 10px 0 0;
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
