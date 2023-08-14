<template>
  <form @submit.prevent="onSubmit">
    <be-input v-model="model" placeholder="Напишите сообщение ...">
      <div class="icon" @click="onSubmit">
        <ArrowTopIcon />
      </div>
    </be-input>
  </form>
</template>

<script setup lang="ts">
import BeInput from '@/components/ui/BeInput.vue'
import { computed } from 'vue'
import ArrowTopIcon from '@/components/icons/ArrowTopIcon.vue'

const props = defineProps<{
  modelValue: unknown
}>()

const emit = defineEmits(['update:modelValue', 'submit'])

const onSubmit = () => emit('submit')

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>
<style scoped lang="scss">
.icon {
  width: 3.7rem;
  height: 3.7rem;
  background-color: #322e37;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}
</style>
