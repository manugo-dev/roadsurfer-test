<script setup lang="ts">
import type { AutocompleteOption } from "@/modules/shared/components/form/AutocompleteField.vue";
import RemoteAutocompleteField, {
  type ExtendedAutocompleteOption,
} from "@/modules/shared/components/form/RemoteAutocompleteField.vue";
import { getStations } from "@/modules/stations/services/stations.service";
import type { Station } from "@/modules/stations/stations.types";
import { useStationsStore } from "@/modules/stations/store/stations.store";

const stationsStore = useStationsStore();

function onOptionSelected(option: ExtendedAutocompleteOption<Station>) {
  stationsStore.setCurrentStation(option.value);
  stationsStore.setStationBookings(option.original.bookings);
}

function transformStationToOption(station: Station): AutocompleteOption {
  return {
    label: station.name,
    value: station.id,
    description: station.bookings.length ? `Bookings: ${station.bookings.length}` : "No bookings available",
  };
}
</script>

<template>
  <RemoteAutocompleteField
    id="station-finder-input"
    :fetch-options="getStations"
    :transform-option="transformStationToOption"
    label="Station Finder"
    placeholder="Search for a station"
    no-options-found-text="No stations found"
    @select="onOptionSelected" />
</template>
