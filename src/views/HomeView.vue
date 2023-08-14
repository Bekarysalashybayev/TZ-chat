<template>
  <main>
    <div :class="['block', currentDialog && 'open-chat']">
      <dialog-block class="block__item contacts" />
      <chat-block class="block__item chat" @back-click="backHandler" />
    </div>
  </main>
</template>

<script setup lang="ts">
import DialogBlock from '@/components/DialogBlock.vue'
import ChatBlock from '@/components/ChatBlock.vue'
import { storeToRefs } from 'pinia'
import { useDialog } from '@/stores/use-dialog'

const { currentDialog } = storeToRefs(useDialog())
const { selectDialog } = useDialog()

const backHandler = () => selectDialog(null)
</script>

<style lang="scss">
@use '@/assets/scss/breakpoint' as *;

main {
  height: 100%;
  background-image: url('@/assets/img/bg-main.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;

  .block {
    overflow: hidden;
    height: 100%;
    display: flex;
    justify-content: space-between;
    max-width: 1668px;
    width: 84.24%;

    &__item {
      height: 100%;

      &.contacts {
        flex: 0 0 40.287%;
      }

      &.chat {
        flex: 0 0 55.52%;
      }
    }

    @media screen and (max-width: $desktop) {
      max-width: 1026px;
      width: 80.15%;

      .contacts,
      .chat {
        flex: 0 0 47.47%;
      }
    }

    @media screen and (max-width: $desktop_small) {
      max-width: 750px;

      .contacts {
        flex: 0 0 39.47%;
      }

      .chat {
        flex: 0 0 56.27%;
      }
    }

    @media screen and (max-width: $mobile) {
      display: block;
      flex-grow: 1;

      .contacts {
        width: 100%;
        border-radius: 0;
      }

      .chat {
        display: none;
      }

      &.open-chat {
        .contacts {
          display: none;
        }

        .chat {
          width: 100%;
          border-radius: 0;
          display: block;
        }
      }
    }
  }
}
</style>
