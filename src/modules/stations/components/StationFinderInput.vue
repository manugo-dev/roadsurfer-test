<script setup lang="ts">
import RemoteAutocompleteField, {
  type ExtendedAutocompleteOption,
} from "@/modules/shared/components/form/RemoteAutocompleteField.vue";
import { getStations } from "@/modules/stations/services/stations.service";
import type { Station } from "@/modules/stations/stations.types";
import { useStationsStore } from "@/modules/stations/store/stations.store";

import { GET_STATIONS_QUERY_KEY } from "../services/stations.keys";
import { transformStationToOption } from "../utils/transformers";

const stationsStore = useStationsStore();

function onOptionSelected(option: ExtendedAutocompleteOption<Station>) {
  stationsStore.setCurrentStation(option.original);
  stationsStore.setStationBookings(option.original.bookings);
}

function onOptionCleared() {
  stationsStore.setCurrentStation(undefined);
  stationsStore.setStationBookings([]);
}
</script>

<template>
  <RemoteAutocompleteField
    id="station-finder-input"
    label="Station Finder"
    placeholder="Search for a station"
    no-options-found-text="No stations found"
    :fetch-options="getStations"
    :transform-option="transformStationToOption"
    :fetch-query-key="GET_STATIONS_QUERY_KEY"
    @clear="onOptionCleared"
    @select="onOptionSelected" />
</template>
