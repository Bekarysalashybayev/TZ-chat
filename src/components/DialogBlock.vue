<template>
  <div class="dialog-block">
    <unknown-dialog v-if="hasDialog" />
    <template v-else>
      <div class="dialog-block__head">
        <search-input v-model="searchValue" />
      </div>
      <be-divider />
      <div class="dialog-block__body scroll">
        <user-dialog
          :img="dialog.img"
          :title="dialog.username"
          :text="lastMessage(i).text"
          :time="lastMessage(i).time"
          :selected="currentDialog === dialog.id"
          :is-last="i === dialogs.length - 1"
          v-for="(dialog, i) in filteredDialogs"
          :key="dialog.id"
          @click="changeDialog(dialog.id)"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import UnknownDialog from '@/components/Dialog/UnknownDialog.vue'
import { computed, ref } from 'vue'
import SearchInput from '@/components/Dialog/SearchInput.vue'
import BeDivider from '@/components/ui/BeDivider.vue'
import UserDialog from '@/components/Dialog/UserDialog.vue'
import { useDialog } from '@/stores/use-dialog'
import { storeToRefs } from 'pinia'
import type { IDialog } from '@/api/dialogs'
import moment from 'moment'

const { selectDialog } = useDialog()
const changeDialog = (id: number) => {
  selectDialog(id)
  searchValue.value = ''
}
const { currentDialog, dialogs } = storeToRefs(useDialog())
const hasDialog = computed(() => false)
const searchValue = ref('')

const filteredDialogs = computed<IDialog[]>(() => {
  if (!searchValue.value) return dialogs.value
  return dialogs.value.filter((dialog: IDialog) =>
    dialog.username.toLowerCase().startsWith(searchValue.value.toLowerCase())
  )
})

const lastMessage = (index: number): { time: string; text: string } => {
  if (!filteredDialogs.value[index].chat.length)
    return {
      time: '',
      text: ''
    }
  const lastText: string = filteredDialogs.value[index].chat.slice(-1)[0].text.slice(-1)[0]
  const lastTime: string = filteredDialogs.value[index].chat.slice(-1)[0].time

  return {
    time: moment(new Date(lastTime)).format('HH:mm'),
    text: lastText
  }
}
</script>

<style scoped lang="scss">
.dialog-block {
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
    height: calc(100% - 11rem);
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-gutter: stable;
  }
}
</style>
