import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { DIALOGS, type IChat, type IDialog } from '@/api/dialogs'

const getNewChat = (chat: IChat[]) => {
  let currentMessage: IChat = { text: [], time: '', isAuthor: false }
  const mergedChat: IChat[] = []
  chat.forEach((message, index) => {
    if (index === 0 || message.isAuthor === currentMessage.isAuthor) {
      currentMessage.text.push(...message.text)
      currentMessage.time = message.time
    } else {
      mergedChat.push(currentMessage)
      currentMessage = { text: [...message.text], time: message.time, isAuthor: message.isAuthor }
    }
    if (index === chat.length - 1) {
      mergedChat.push(currentMessage)
    }
  })
  return mergedChat
}

export const useDialog = defineStore('dialog', () => {
  const currentDialog = ref<number | null>(null)
  const dialogs = ref<IDialog[]>(DIALOGS)
  const currentChat = computed<IDialog | null>(() => {
    if (!currentDialog.value) return null
    return {
      ...dialogs.value.filter(({ id }) => id === currentDialog.value)[0],
      chat: getNewChat(
        dialogs.value.filter(({ id }) => id === currentDialog.value)[0].chat
      ).reverse()
    }
  })

  const selectDialog = (id: number | null) => {
    currentDialog.value = id
  }

  const sendMessage = (message: IChat) => {
    for (let i = 0; i < dialogs.value.length; i++) {
      if (dialogs.value[i].id === currentDialog.value) {
        dialogs.value[i].chat.push(message)
      }
    }
  }

  return { currentDialog, selectDialog, dialogs, currentChat, sendMessage }
})
