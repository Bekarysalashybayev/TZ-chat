<template>
  <be-input v-model="model" placeholder="Поиск ..."><ProfileIcon /> </be-input>
</template>

<script setup lang="ts">
import ProfileIcon from '@/components/icons/ProfileIcon.vue'
import BeInput from '@/components/ui/BeInput.vue'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: unknown
}>()

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>
<style scoped lang="scss"></style>
