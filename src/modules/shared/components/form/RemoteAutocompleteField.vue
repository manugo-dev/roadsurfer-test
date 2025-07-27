<script setup lang="ts" generic="P">
import { useQuery } from "@tanstack/vue-query";
import { refDebounced } from "@vueuse/core";
import { computed, ref } from "vue";

import AutocompleteField, { type AutocompleteFieldProps, type AutocompleteOption } from "./AutocompleteField.vue";

export interface RemoteAutocompleteFieldProps<P> extends Omit<AutocompleteFieldProps, "options" | "modelValue"> {
  modelValue?: AutocompleteOption | null;
  fetchOptions: (query: string) => Promise<P[]>;
  transformOption: (option: P) => AutocompleteOption;
  label?: string;
  placeholder?: string;
  noOptionsFoundText?: string;
  disabled?: boolean;
  required?: boolean;
  clearOnBlur?: boolean;
  filterOptions?: boolean;
}

const props = withDefaults(defineProps<RemoteAutocompleteFieldProps<P>>(), {
  clearOnBlur: true,
  filterOptions: false,
});

const emit = defineEmits(["update:modelValue", "select", "blur", "focus", "update:input"]);

const inputQuery = ref("");
const inputQueryDebounced = refDebounced(inputQuery, 500);
const enabled = ref(true);

const queryKey = computed(() => ["remote-autocomplete", ...(props.filterOptions ? [] : [inputQueryDebounced])]);

const query = useQuery({
  queryKey,
  queryFn: () => props.fetchOptions(inputQueryDebounced.value),
  select: (data) =>
    data.map((item) => ({
      ...props.transformOption(item),
      original: item,
    })),
  enabled,
  staleTime: 60_000,
  retry: 1,
});

function handleSelect(option: AutocompleteOption) {
  emit("update:modelValue", option);
  emit("select", option);
}

function handleInputUpdate(value: string) {
  inputQuery.value = value;
  emit("update:input", value);
}
</script>

<template>
  <AutocompleteField
    :model-value="modelValue"
    :options="query.data.value ?? []"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :no-options-found-text="noOptionsFoundText"
    :clear-on-blur="clearOnBlur"
    :filter-options="filterOptions"
    @select="handleSelect"
    @blur="$emit('blur')"
    @focus="$emit('focus')"
    @update:input="handleInputUpdate" />
</template>
