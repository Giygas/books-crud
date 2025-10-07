<script setup lang="ts">
import { Button } from "@/components/ui/button";

interface Props {
  icon?: string;
  title: string;
  description?: string;
  actionText?: string;
  actionRoute?: string;
  onAction?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "📚",
  description: "",
});

const handleAction = () => {
  if (props.onAction) {
    props.onAction();
  } else if (props.actionRoute) {
    navigateTo(props.actionRoute);
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="text-6xl mb-4">{{ icon }}</div>
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      {{ title }}
    </h3>
    <p
      v-if="description"
      class="text-gray-600 dark:text-gray-400 mb-6 max-w-md"
    >
      {{ description }}
    </p>
    <slot name="action">
      <Button
        v-if="actionText || onAction"
        @click="handleAction"
        variant="default"
        class="hover:bg-blue-600 transition-colors"
      >
        {{ actionText || "Get Started" }}
      </Button>
    </slot>
  </div>
</template>
