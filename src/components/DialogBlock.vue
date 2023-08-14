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
          text=" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quia, voluptatum!"
          time="17:49"
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
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-gutter: stable;
  }
}
</style>
