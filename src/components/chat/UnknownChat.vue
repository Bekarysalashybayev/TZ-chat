<template>
  <div class="unknown">
    <unknown-icon />
    <div class="title">Чат не выбран</div>
    <div class="label">Выберите чат, начните общение!</div>
  </div>
</template>
<script setup lang="ts">
import UnknownIcon from '@/components/icons/UnknownIcon.vue'
</script>

<style scoped lang="scss">
.unknown {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .title {
    margin: 8.6rem 0 0.9rem;
  }
}
</style>
