<script setup lang="ts">
import axios from "axios";

import type { AutocompleteOption } from "@/modules/shared/components/form/AutocompleteField.vue";
import RemoteAutocompleteField from "@/modules/shared/components/form/RemoteAutocompleteField.vue";

const fetchStations = (query: string): Promise<{ name: string; id: string }[]> =>
  axios
    .get("https://605c94c36d85de00170da8b4.mockapi.io/stations", { params: { name: query } })
    .then((response) => response.data);

function onOptionSelected(option: AutocompleteOption) {
  console.log("Selected station:", option);
}

function transformStationToOption(station: { id: string; name: string }): AutocompleteOption {
  return {
    label: station.name,
    value: station.id,
  };
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold text-zinc-800">Dashboard</h1>
    <RemoteAutocompleteField
      :fetch-options="fetchStations"
      :transform-option="transformStationToOption"
      label="Estación"
      placeholder="Buscar una estación"
      no-options-found-text="No se encontraron estaciones"
      @select="onOptionSelected" />
  </div>
</template>
