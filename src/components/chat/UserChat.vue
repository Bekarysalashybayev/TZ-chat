<template>
  <div v-for="(message, i) in chat" :key="i">
    <div class="user-chat">
      <user-message
        :text="message.text"
        :time="message.time"
        :is-author="message.isAuthor"
        :img="img"
        :username="username"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserMessage from '@/components/chat/UserMessage.vue'
import type { IChat } from '@/api/dialogs'

defineProps<{
  chat: IChat[]
  img?: string
  username?: string
}>()
</script>

<style scoped lang="scss">
.user-chat {
  padding: 2rem;
}
</style>
