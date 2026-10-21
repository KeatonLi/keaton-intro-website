<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "./button-variants"
import { cn } from "~/lib/utils"
import { Primitive } from "reka-ui"
import { buttonVariants } from "./button-variants"

// Explicit props keep Nuxt's SFC compiler compatible with Reka's type barrel.
interface Props {
  as?: PrimitiveProps["as"]
  asChild?: boolean
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
})
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
