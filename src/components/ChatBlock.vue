<template>
  <div class="chat-block">
    <unknown-chat v-if="!currentDialog" />
    <template v-if="currentDialog && currentChat">
      <div class="chat-block__head">
        <chat-header
          :img="currentChat.img"
          :username="currentChat.username"
          :key="currentChat.id"
          @back-click="$emit('backClick')"
        />
      </div>
      <be-divider />
      <div class="chat-block__body scroll" ref="target">
        <user-chat
          :chat="currentChat.chat"
          :img="currentChat.img"
          :username="currentChat.username"
        />
      </div>
      <be-divider />
      <div class="chat-block__head">
        <chat-input v-model="inputValue" @submit="onSubmit" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import ChatHeader from '@/components/chat/ChatHeader.vue'
import BeDivider from '@/components/ui/BeDivider.vue'
import UserChat from '@/components/chat/UserChat.vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDialog } from '@/stores/use-dialog'
import UnknownChat from '@/components/chat/UnknownChat.vue'
import type { IChat } from '@/api/dialogs'
import { useScroll } from '@vueuse/core'

const target = ref()
const { y } = useScroll(target)

defineEmits(['backClick'])

const { currentDialog, currentChat } = storeToRefs(useDialog())
const { sendMessage } = useDialog()

const inputValue = ref('')
const inputMessage = ref<IChat>({
  time: new Date().toString(),
  text: [],
  isAuthor: true
})

const onSubmit = () => {
  inputMessage.value.text = [inputValue.value]
  sendMessage(inputMessage.value)
  inputValue.value = ''
  y.value = 0
}
</script>

<style scoped lang="scss">
.chat-block {
  border: 1px solid var(--color-border);
  border-radius: 20px;
  box-shadow: 2px 0 10px 0 rgba(6, 3, 9, 0.05);
  background-color: var(--color-background-block);
  display: flex;
  flex-direction: column;

  &__head {
    padding: 2rem;
  }

  &__body {
    height: calc(100% - 20rem);
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-gutter: stable;
    display: flex;
    flex-direction: column-reverse;

    &::-webkit-scrollbar {
      width: 5px;
    }
  }
}
</style>
