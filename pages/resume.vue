<template>
  <div class="flex min-h-[60vh] items-center justify-center bg-[#f3f5f8] px-5 text-sm text-black/48">
    正在前往首页简历…
  </div>
</template>

<script setup>
await navigateTo('/#profile', { redirectCode: 302 })
</script>
