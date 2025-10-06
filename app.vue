<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import { toast } from "vue-sonner";
import { useMessageData } from "~/lib/store";

const messages = useMessageData();

watch(messages, () => {
  if (messages.value.success) {
    toast.success(messages.value.message);
  }

  if (messages.value.error) {
    toast.error(messages.value.message);
  }
});
type Theme = "light" | "dark" | "system";

const colorMode = useColorMode();
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
