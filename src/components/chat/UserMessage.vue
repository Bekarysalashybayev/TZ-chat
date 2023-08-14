<template>
  <div :class="['user-massage', isAuthor && 'my']">
    <div class="user-massage__img" v-if="!isAuthor">
      <img :src="imageUrl" alt="picture" />
    </div>
    <div class="user-massage__info">
      <div class="message" v-for="(mess, i) in text" :key="i">
        <div class="message-body">
          <div class="title" v-if="!isAuthor && i === 0">{{ username }}</div>
          <div class="label">{{ mess }}</div>
        </div>
        <div class="message-time label">17:49</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IChat } from '@/api/dialogs'
import { computed } from 'vue'

interface IMessage extends IChat {
  img?: string
  username?: string
}

const props = defineProps<IMessage>()

const imageUrl = computed(() => {
  return new URL(`../../assets/img/user/${props.img}`, import.meta.url).href
})
</script>

<style scoped lang="scss">
.user-massage {
  display: flex;
  align-items: flex-end;

  &__img {
    flex: 0 0 4.7rem;
    height: 4.7rem;
    background-color: var(--color-background);
    border-radius: 15px;
    border: 1px solid var(--color-border);
    margin-right: 1.5rem;

    img {
      border-radius: 15px;
      width: 100%;
      height: 100%;
    }
  }

  &__info {
    width: 100%;
    font-size: 1.6rem;

    .title {
      line-height: 1.95rem;
      font-weight: 600;
    }

    .label {
      line-height: 2.6rem;
    }
  }

  .message {
    max-width: 75%;
    display: flex;
    align-items: flex-end;
    border-radius: 3rem 3rem 3rem 0.2rem;
    background-color: #2c2731;
    padding: 2rem;

    &-body {
      margin-right: 3rem;
    }

    &-time {
      font-size: 1.2rem;
      line-height: 2rem;
      margin-left: auto;
    }

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }

  &.my {
    .message {
      margin-left: auto;
      border-radius: 3rem 3rem 0.2rem 3rem;
    }
  }
}
</style>
