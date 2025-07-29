import { defineStore } from "pinia";
import { ref } from "vue";

export const useStationsStore = defineStore("stations", () => {
  const currentStation = ref();

  const setCurrentStation = (station: string) => {
    currentStation.value = station;
  };

  return { currentStation, setCurrentStation };
});
