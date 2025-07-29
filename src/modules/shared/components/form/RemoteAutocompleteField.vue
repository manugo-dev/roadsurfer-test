<script setup lang="ts" generic="T">
import { useQuery } from "@tanstack/vue-query";
import { refDebounced } from "@vueuse/core";
import { computed, ref, useId } from "vue";

import AutocompleteField, { type AutocompleteFieldProps, type AutocompleteOption } from "./AutocompleteField.vue";

import LoadingSpinner from "../ui/LoadingSpinner.vue";

export interface ExtendedAutocompleteOption<T> extends AutocompleteOption {
  readonly original: T;
}

export interface RemoteAutocompleteFieldProps<T>
  extends Omit<AutocompleteFieldProps<ExtendedAutocompleteOption<T>>, "options"> {
  modelValue?: ExtendedAutocompleteOption<T> | null;
  fetchOptions: (query: string) => Promise<T[]>;
  transformOption: (option: T) => AutocompleteOption;
  label?: string;
  placeholder?: string;
  noOptionsFoundText?: string;
  disabled?: boolean;
  required?: boolean;
  clearOnBlur?: boolean;
  filterOptions?: boolean;
  errorMessage?: string;
  helperText?: string;
  fetchOnLoad?: boolean;
  fetchQueryKey?: string;
}

const props = withDefaults(defineProps<RemoteAutocompleteFieldProps<T>>(), {
  clearOnBlur: true,
  filterOptions: false,
  noOptionsFoundText: "No options found",
  fetchOnLoad: true,
  fetchQueryKey: "remote-autocomplete",
});
const fieldId = props.id ?? useId();

const emit = defineEmits<{
  "update:modelValue": [value: ExtendedAutocompleteOption<T> | null];
  select: [option: ExtendedAutocompleteOption<T>];
  blur: [];
  focus: [];
  clear: [];
  "update:input": [value: string];
  "update:data": [options: T[]];
  "update:options": [options: ExtendedAutocompleteOption<T>[]];
}>();

const inputQuery = ref<string>("");
const inputQueryDebounced = refDebounced(inputQuery, 500);
const enabled = ref<boolean>(props.fetchOnLoad);

const queryKey = computed<readonly string[]>(() => [
  props.fetchQueryKey,
  ...(props.filterOptions || !inputQueryDebounced.value ? [] : [inputQueryDebounced.value]),
]);

const query = useQuery({
  queryKey,
  queryFn: (): Promise<T[]> => props.fetchOptions(inputQueryDebounced.value),
  select: (data: T[]): ExtendedAutocompleteOption<T>[] => {
    const formattedOptions = data.map(
      (item): ExtendedAutocompleteOption<T> => ({
        ...props.transformOption(item),
        original: item,
      }),
    );
    emit("update:data", data);
    emit("update:options", formattedOptions);
    return formattedOptions;
  },
  enabled,
  staleTime: 60_000,
  retry: 1,
});

function handleSelect(option: ExtendedAutocompleteOption<T>): void {
  emit("update:modelValue", option);
  emit("select", option);
}

function handleInputUpdate(value: string): void {
  inputQuery.value = value;
  emit("update:input", value);
}
</script>

<template>
  <AutocompleteField
    :id="fieldId"
    :model-value="modelValue"
    :options="query.data.value ?? []"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :clear-on-blur="clearOnBlur"
    :filter-options="filterOptions"
    :no-options-found-text="noOptionsFoundText"
    :error-message="errorMessage"
    :helper-text="helperText"
    @select="handleSelect"
    @blur="$emit('blur')"
    @focus="$emit('focus')"
    @clear="$emit('clear')"
    @update:input="handleInputUpdate">
    <template v-slot:options>
      <div v-if="query.isLoading.value">
        <LoadingSpinner size="sm" />
      </div>
      <div v-else-if="!query.data.value?.length">{{ noOptionsFoundText }}</div>
    </template>
  </AutocompleteField>
</template>
