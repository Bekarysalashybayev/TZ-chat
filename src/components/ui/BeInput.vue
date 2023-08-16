<template>
  <div
    :class="['input-wrapper', $slots.default && 'has-icon', focused && 'focused', classes]"
    :style="style"
  >
    <input
      type="text"
      ref="input"
      v-bind="nativeAttrs"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import { ref, type StyleValue, useAttrs } from 'vue'

defineProps<{
  placeholder?: string
  modelValue: unknown
}>()

const input = ref<HTMLInputElement>()
const { focused } = useFocus(input)

const {
  class: classes,
  style,
  ...nativeAttrs
}: { style?: StyleValue; class?: unknown } = useAttrs()

const emit = defineEmits(['update:modelValue'])
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const focusInput = () => input.value?.focus()
const blurInput = () => input.value?.blur()

defineExpose({ input, focus: focusInput, blur: blurInput })
</script>

<style scoped lang="scss">
.input-wrapper {
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 1rem 1.5rem;
  border-radius: 2rem;
  background-color: rgba(43, 38, 48, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.focused {
    border-color: var(--color-background-selected);
  }

  &.has-icon {
    input {
      margin-right: 1rem;
    }
  }

  input {
    flex-grow: 1;
    color: var(--color-text);
    font-size: 1.6rem;
    line-height: 1.95rem;
    background-color: transparent;
    border: 0;

    &::placeholder {
      color: var(--color-text-1);
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
