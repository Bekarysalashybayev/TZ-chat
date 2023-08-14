<template>
  <div class="divider" :style="styles"></div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    opacity?: number
    bgColor?: string
  }>(),
  {
    opacity: 0.2
  }
)

const styles = computed(() => {
  return {
    opacity: props.opacity,
    backgroundColor: props.bgColor
  }
})
</script>
<style scoped lang="scss">
.divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-text-1);
}
</style>
