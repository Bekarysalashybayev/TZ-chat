<template>
  <div v-for="(chatC, key) in groupedChat" :key="key" class="chat-body">
    <div class="message-date">
      {{ key === moment(new Date()).format('YYYY-MM-DD') ? 'Сегодня' : key }}
    </div>
    <div v-for="(message, i) in chatC.reverse()" :key="i">
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
  </div>
</template>

<script setup lang="ts">
import UserMessage from '@/components/chat/UserMessage.vue'
import type { IChat } from '@/api/dialogs'
import { computed } from 'vue'
import moment from 'moment'

const props = defineProps<{
  chat: IChat[]
  img?: string
  username?: string
}>()

const groupedChat = computed(() => {
  const newArr: Record<string, IChat[]> = {}

  props.chat.forEach((chat) => {
    const date = moment(new Date(chat.time)).format('YYYY-MM-DD')
    if (!newArr[date]) {
      newArr[date] = [] // Теперь добавляем массив с использованием строки в качестве ключа
    }
    newArr[date].push(chat)
  })

  return newArr
})
</script>

<style scoped lang="scss">
.chat-body {
  padding-top: 2rem;
}
.user-chat {
  padding: 2rem;
}

.message-date {
  color: #ffffff;
  font-size: 1.4rem;
  line-height: 1.7rem;
  font-weight: 500;
  border-radius: 2rem;
  padding: 1rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  width: max-content;
  margin: 0 auto;
}
</style>
