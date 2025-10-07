<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  type?: "spinner" | "skeleton" | "dots";
  size?: "sm" | "md" | "lg";
  text?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "spinner",
  size: "md",
  text: "Loading...",
});

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

const spinnerSize = computed(() => sizeClasses[props.size]);
</script>

<template>
  <div
    :class="props.class"
    class="flex flex-col items-center justify-center space-y-3"
  >
    <!-- Spinner Type -->
    <div
      v-if="type === 'spinner'"
      :class="spinnerSize"
      class="animate-spin rounded-full border-b-2 border-blue-600"
    ></div>

    <!-- Skeleton Type -->
    <div v-else-if="type === 'skeleton'" class="w-full space-y-3">
      <Skeleton class="h-4 w-[200px]" />
      <Skeleton class="h-4 w-[150px]" />
      <Skeleton class="h-4 w-[100px]" />
    </div>

    <!-- Dots Type -->
    <div v-else-if="type === 'dots'" class="flex space-x-2">
      <div
        class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
        style="animation-delay: 0ms"
      ></div>
      <div
        class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
        style="animation-delay: 150ms"
      ></div>
      <div
        class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
        style="animation-delay: 300ms"
      ></div>
    </div>

    <!-- Loading Text -->
    <p v-if="text" class="text-sm text-gray-600 dark:text-gray-400">
      {{ text }}
    </p>
  </div>
</template>
