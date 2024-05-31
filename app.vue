<script setup lang="ts">
  import { Toaster } from "@/components/ui/sonner"
</script>
<template>
  <Toaster theme="dark" position="top-center" />
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'bounce',
        mode: 'out-in',
      }"
    />
  </NuxtLayout>
</template>
