import { createHttpClient } from "@/modules/core/services/http";

import type { Station, StationBooking } from "../stations.types";

export const stationsApi = createHttpClient({
  baseURL: import.meta.env.VITE_BOOKING_API_BASE_URL,
  timeout: 10000,
});

export const getStations = async (name?: string): Promise<Station[]> => {
  const response = await stationsApi.get<Station[]>("/stations", {
    params: { name },
  });
  return response.data;
};

export const getStationsBookingDetail = async (stationId: string, bookingId: string): Promise<StationBooking> => {
  const response = await stationsApi.get<StationBooking>(`/stations/${stationId}/bookings/${bookingId}`);
  return response.data;
};
