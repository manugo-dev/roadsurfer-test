<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref, computed, nextTick, useId } from "vue";

import InputField, { type InputFieldProps } from "./InputField.vue";

export interface AutocompleteOption {
  label: string;
  value: string;
  description?: string;
}

export interface AutocompleteFieldProps<T = AutocompleteOption> extends Omit<InputFieldProps, "modelValue" | "type"> {
  modelValue?: T | null;
  options: T[];
  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => string;
  noOptionsFoundText?: string;
  clearOnBlur?: boolean;
  filterOptions?: boolean;
}

const props = withDefaults(defineProps<AutocompleteFieldProps>(), {
  getOptionLabel: (option: AutocompleteOption) => option.label,
  getOptionValue: (option: AutocompleteOption) => option.value,
  clearOnBlur: true,
  noOptionsFoundText: "No options found",
  filterOptions: true,
});

const emit = defineEmits(["update:modelValue", "select", "blur", "focus", "update:input"]);

const fieldId = props.id ?? useId();

const query = ref("");
const open = ref(false);
const highlighted = ref(-1);

const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);

const filteredOptions = computed(() =>
  props.filterOptions
    ? props.options.filter((opt) => props.getOptionLabel(opt).toLowerCase().includes(query.value.trim().toLowerCase()))
    : props.options,
);

function select(option: AutocompleteOption) {
  query.value = props.getOptionLabel(option);
  emit("update:modelValue", option);
  emit("select", option);
  open.value = false;
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Tab") {
    open.value = false;
    return;
  }
  if (!open.value) open.value = true;
  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      highlighted.value = (highlighted.value + 1) % filteredOptions.value.length;
      scrollToHighlighted();
      break;
    case "ArrowUp":
      e.preventDefault();
      highlighted.value = (highlighted.value - 1 + filteredOptions.value.length) % filteredOptions.value.length;
      scrollToHighlighted();
      break;
    case "Enter":
      e.preventDefault();
      if (highlighted.value >= 0) select(filteredOptions.value[highlighted.value]);
      break;
    case "Escape":
      open.value = false;
      break;
  }
}

function scrollToHighlighted() {
  nextTick(() => {
    const el = listRef.value?.querySelector(`[data-idx="${highlighted.value}"]`);
    // Ensure the element is an HTMLElement and has scrollIntoView method
    if (el instanceof HTMLElement && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ block: "nearest" });
    }
  });
}

function handleClickOutside() {
  open.value = false;
}

function handleFocus() {
  open.value = true;
  highlighted.value = -1;
  emit("focus");
}

onClickOutside(wrapperRef, handleClickOutside);
</script>

<template>
  <div
    :id="`autocomplete-wrapper_${fieldId}`"
    class="relative w-full"
    ref="wrapperRef"
    @keydown="handleKeyDown"
    @blur="$emit('blur')">
    <InputField
      :id="fieldId"
      ref="inputRef"
      v-model="query"
      :aria-expanded="open"
      role="combobox"
      aria-autocomplete="list"
      aria-controls="autocomplete-listbox"
      :clearable="true"
      :label="props.label"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :required="props.required"
      :error-message="props.errorMessage"
      :helper-text="props.helperText"
      @focus="handleFocus"
      @input="$emit('update:input', query)" />
    <ul
      v-if="open"
      ref="listRef"
      :id="`autocomplete-listbox_${fieldId}`"
      role="listbox"
      class="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded border border-zinc-300 bg-white shadow-md">
      <li v-if="!filteredOptions.length" class="w-full px-3 py-2 text-sm text-zinc-400 italic select-none">
        <slot name="options">
          {{ props.noOptionsFoundText }}
        </slot>
      </li>
      <li
        v-for="(option, idx) in filteredOptions"
        :key="props.getOptionValue(option)"
        :data-idx="idx"
        role="option"
        :aria-selected="highlighted === idx"
        @click="select(filteredOptions[idx])"
        class="hover:bg-primary flex cursor-pointer flex-col px-3 py-2 text-sm hover:text-white"
        :class="{ 'bg-primary text-white': highlighted === idx }">
        <span class="font-bold">{{ props.getOptionLabel(option) }}</span>
        <span v-if="option.description" class="text-xs">{{ option.description }}</span>
      </li>
    </ul>
  </div>
</template>
