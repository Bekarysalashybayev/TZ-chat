<template>
  <div :class="['user-dialog', selected && 'selected', isLast && 'last']" @click="selectDialog">
    <div class="user-dialog__img">
      <img :src="imageUrl" alt="picture" />
    </div>
    <div class="user-dialog__description">
      <div class="user-dialog__data">
        <div class="user-dialog__info">
          <div class="title">{{ title }}</div>
          <div class="label">
            {{ text }}
          </div>
        </div>
        <div class="user-dialog__time label">{{ time }}</div>
      </div>
      <be-divider v-if="!isLast" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BeDivider from '@/components/ui/BeDivider.vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    img?: string
    title: string
    text: string
    time: string
    selected?: boolean
    isLast: boolean
  }>(),
  {
    selected: false,
    isLast: false
  }
)

const emit = defineEmits(['click'])
const selectDialog = () => emit('click')

const imageUrl = computed(() => {
  return new URL(`../../assets/img/user/${props.img}`, import.meta.url).href
})
</script>

<style scoped lang="scss">
.user-dialog {
  width: 100%;
  display: flex;
  padding: 2rem 2rem 0;
  cursor: pointer;

  &:hover {
    background-color: rgba(125, 119, 129, 0.2);
  }

  &.selected {
    background-color: rgba(88, 85, 255, 0.2);
  }

  &__img {
    flex: 0 0 7.5rem;
    height: 7.5rem;
    background-color: var(--color-background);
    border-radius: 15px;
    border: 1px solid var(--color-border);

    img {
      border-radius: 15px;
      width: 100%;
      height: 100%;
    }
  }

  &__description {
    margin-left: 2rem;
    flex-grow: 1;
  }

  &__data {
    display: flex;
  }

  &__info {
    flex-grow: 1;

    .title {
      font-weight: 500;
      margin: 0.2rem 0 0.8rem;
    }

    .label {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 1.5rem;
      min-height: 4.8rem;
    }
  }

  .label {
    font-size: 1.4rem;
    line-height: 2.4rem;
  }

  &.last .label {
    margin-bottom: 0;
  }

  &__time {
    margin-left: 2rem;
  }
}
</style>
