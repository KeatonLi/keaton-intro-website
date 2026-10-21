<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "~/lib/utils"
import { ref } from "vue"

const element = ref<HTMLInputElement>()
defineExpose({ element, focus: (options?: FocusOptions) => element.value?.focus(options) })

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    ref="element"
    v-model="modelValue"
    data-slot="input"
    :class="cn('nova-input', props.class)"
  >
</template>
