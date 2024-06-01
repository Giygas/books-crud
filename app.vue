<script setup lang="ts">
  import { Toaster } from "@/components/ui/sonner"

  type Theme = "light" | "dark" | "system"

  const colorMode = useColorMode()
</script>
<template>
  <Toaster
    :rich-colors="true"
    :theme="colorMode.preference as Theme"
    position="top-center"
  />
  <NuxtLayout>
    <NuxtPage
      :transition="{
        name: 'bounce',
        mode: 'out-in',
      }"
    />
  </NuxtLayout>
</template>
