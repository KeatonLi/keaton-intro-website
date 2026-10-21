<template>
  <MotionConfig reduced-motion="user" :transition="{ duration: 0.16 }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </MotionConfig>
</template>

<script setup lang="ts">
import { MotionConfig } from 'motion-v'
</script>
