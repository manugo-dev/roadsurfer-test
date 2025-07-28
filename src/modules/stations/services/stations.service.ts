import { createHttpClient } from "@/modules/core/services/http";

import type { Station } from "../stations.types";

export const stationsApi = createHttpClient({
  baseURL: import.meta.env.VITE_BOOKING_API_BASE_URL,
  timeout: 10000,
});

export const getStations = async (name: string) => {
  const response = await stationsApi.get<Station[]>("/stations", {
    params: { name },
  });
  return response.data;
};
