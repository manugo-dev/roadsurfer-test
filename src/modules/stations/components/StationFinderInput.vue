<script setup lang="ts">
import type { AutocompleteOption } from "@/modules/shared/components/form/AutocompleteField.vue";
import RemoteAutocompleteField, {
  type ExtendedAutocompleteOption,
} from "@/modules/shared/components/form/RemoteAutocompleteField.vue";

import { getStations } from "../services/stations.service";
import type { Station } from "../stations.types";

function onOptionSelected(option: ExtendedAutocompleteOption<Station>) {
  console.log("Selected station:", option);
}

function transformStationToOption(station: Station): AutocompleteOption {
  return {
    label: station.name,
    value: station.id,
  };
}
</script>

<template>
  <RemoteAutocompleteField
    id="station-finder-input"
    :fetch-options="getStations"
    :transform-option="transformStationToOption"
    label="Estación"
    placeholder="Buscar una estación"
    no-options-found-text="No se encontraron estaciones"
    @select="onOptionSelected" />
</template>
