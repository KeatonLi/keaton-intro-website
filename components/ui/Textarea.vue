<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "~/lib/utils"
import { ref } from "vue"

const element = ref<HTMLTextAreaElement>()
defineExpose({ element, focus: (options?: FocusOptions) => element.value?.focus(options) })

const props = defineProps<{
  class?: HTMLAttributes["class"]
  defaultValue?: string | number
  modelValue?: string | number
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
  <textarea
    ref="element"
    v-model="modelValue"
    data-slot="textarea"
    :class="cn('nova-textarea', props.class)"
  />
</template>
