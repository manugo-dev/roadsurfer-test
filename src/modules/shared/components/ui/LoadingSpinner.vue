<script lang="ts" setup>
export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<LoadingSpinnerProps>(), {
  size: "md",
});
</script>

<template>
  <div
    :class="{
      'my-2 h-6 w-6': props.size === 'sm',
      'my-4 h-10 w-10': props.size === 'md',
      'my-4 h-16 w-16': props.size === 'lg',
    }"
    class="border-t-primary m-auto animate-spin rounded-[50%] border-4 border-solid border-zinc-200"
    role="status">
    <span class="sr-only">Loading</span>
  </div>
</template>
