import { useQuery } from "@tanstack/vue-query";

import { GET_STATIONS_BOOKING_DETAIL_QUERY_KEY, GET_STATIONS_QUERY_KEY } from "../services/stations.keys";
import { getStations, getStationsBookingDetail } from "../services/stations.service";

export const useGetStationsQuery = (stationName?: string) => {
  return useQuery({
    queryKey: [GET_STATIONS_QUERY_KEY, ...(stationName ? [stationName] : [])],
    queryFn: () => getStations(stationName),
    select: (data) => data || [],
    enabled: true,
  });
};

export const useGetStationsBookingDetailQuery = (stationId: string, bookingId: string) => {
  return useQuery({
    queryKey: [GET_STATIONS_BOOKING_DETAIL_QUERY_KEY, stationId, bookingId],
    queryFn: () => getStationsBookingDetail(stationId, bookingId),
    select: (data) => data || [],
    enabled: !!stationId && !!bookingId,
  });
};
