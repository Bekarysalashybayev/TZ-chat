<template>
  <div class="chat-header">
    <div class="back" v-if="width < 768">
      <back-button @click="$emit('backClick')" />
    </div>
    <div class="chat-header__img">
      <img :src="imageUrl" alt="picture" />
    </div>
    <div class="chat-header__info">
      <div class="title">{{ username }}</div>
      <div class="label">Был 7 часов назад</div>
    </div>
    <be-button class="chat-header__btn">{{ btnText }}</be-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BeButton from '@/components/ui/BeButton.vue'
import { useWindowSize } from '@vueuse/core'
import BackButton from '@/components/ui/BackButton.vue'

defineEmits(['backClick'])

const { width } = useWindowSize()

const btnText = computed(() => {
  if (width.value < 1280) return 'Поддержка'
  return 'Связаться с поддержкой'
})

const { img } = defineProps<{
  img?: string
  username: string
}>()

const imageUrl = computed(() => {
  return new URL(`../../assets/img/user/${img}`, import.meta.url).href
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/breakpoint' as *;

.chat-header {
  display: flex;
  align-items: center;

  .back {
  }

  &__img {
    flex: 0 0 6rem;
    height: 6rem;
    background-color: var(--color-background);
    border-radius: 15px;
    border: 1px solid var(--color-border);

    img {
      border-radius: 15px;
      width: 100%;
      height: 100%;
    }
  }

  &__info {
    margin: 0 2rem;

    .title {
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .label {
      font-size: 1.2rem;
      line-height: 1.463rem;
    }
  }

  &__btn {
    margin-left: auto;
  }
}
</style>
