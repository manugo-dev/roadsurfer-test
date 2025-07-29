<script setup lang="ts">
import { computed, ref, useAttrs, useId, watch } from "vue";

export interface InputFieldProps {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
}

const props = defineProps<InputFieldProps>();
const attrs = useAttrs();
const fieldId = props.id ?? useId();
const modelValue = defineModel<string>({ default: "", type: String });

const hasError = computed(() => !!props.errorMessage);
const showClear = computed(() => props.clearable && modelValue.value.length > 0 && !props.disabled);
const inputRef = ref<HTMLInputElement>();

const emit = defineEmits(["input", "clear"]);

watch(modelValue, (inputValue) => {
  emit("input", inputValue);
});

function clearInput() {
  modelValue.value = "";
  inputRef.value?.focus();
  emit("clear");
}
</script>

<template>
  <div :id="`input-group_${fieldId}`" class="relative flex flex-col">
    <label
      :id="`input-label_${fieldId}`"
      v-if="props.label"
      :for="fieldId"
      class="text-sm font-medium text-zinc-400 uppercase"
      :class="{ 'font-bold text-red-500': hasError }">
      {{ props.label }}
      <span v-if="props.required" aria-label="required field" class="text-red-500">*</span>
    </label>
    <div :id="`input-container_${fieldId}`" class="relative">
      <input
        :id="fieldId"
        ref="inputRef"
        v-model="modelValue"
        :type="props.type || 'text'"
        :placeholder="props.placeholder"
        :aria-required="props.required"
        :aria-invalid="hasError"
        :aria-describedby="
          [props.helperText ? `${fieldId}-help` : '', props.errorMessage ? `${fieldId}-error` : '']
            .filter(Boolean)
            .join(' ')
        "
        :disabled="props.disabled"
        :required="props.required"
        v-bind="attrs"
        class="focus:ring-primary focus:border-primary w-full rounded-sm border-2 border-zinc-300 p-2 pr-10 text-base text-zinc-600 transition-colors duration-200 outline-none placeholder:text-zinc-400 focus:ring-2"
        :class="{ 'border-red-500': hasError, 'cursor-not-allowed border-zinc-900': props.disabled }" />

      <button
        v-if="showClear"
        type="button"
        @click="clearInput"
        aria-label="Clear input"
        class="focus:ring-primary absolute top-1/2 right-2 flex -translate-y-1/2 cursor-pointer items-center justify-center text-2xl text-zinc-400 hover:text-zinc-600 focus:ring-1 focus:outline-none">
        <span class="sr-only">Clear input</span>
        <svg
          class="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <span v-if="props.helperText" :id="`${fieldId}-help`" class="mt-1 text-xs text-zinc-500">
      {{ props.helperText }}
    </span>
    <span
      v-if="props.errorMessage"
      :id="`${fieldId}-error`"
      class="mt-1 text-xs text-red-500"
      role="alert"
      aria-live="polite">
      {{ props.errorMessage }}
    </span>
  </div>
</template>
