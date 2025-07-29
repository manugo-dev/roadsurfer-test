import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { getStations, getStationsBookingDetail, stationsApi } from "./stations.service";

import { MOCKED_GET_STATIONS_BOOKING_DETAIL_RESPONSE, MOCKED_GET_STATIONS_RESPONSE } from "../stations.mocks";

vi.mock("axios");

vi.mock("@/modules/core/services/http", () => ({
  createHttpClient: vi.fn(() => ({
    get: vi.fn(),
  })),
}));

describe("Stations Service", () => {
  const mockStationsApiGet = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(stationsApi.get).mockImplementation(mockStationsApiGet);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("getStations", () => {
    it("should fetch all stations when no name parameter is provided", async () => {
      mockStationsApiGet.mockResolvedValue({ data: MOCKED_GET_STATIONS_RESPONSE });
      const result = await getStations();
      expect(mockStationsApiGet).toHaveBeenCalledWith("/stations", { params: {} });
      expect(result).toEqual(MOCKED_GET_STATIONS_RESPONSE);
    });

    it("should fetch stations with name filter when name parameter is provided", async () => {
      const searchName = "Test Station";
      mockStationsApiGet.mockResolvedValue({ data: MOCKED_GET_STATIONS_RESPONSE });
      await getStations(searchName);
      expect(mockStationsApiGet).toHaveBeenCalledWith("/stations", {
        params: { name: searchName },
      });
    });
  });

  describe("getStationsBookingDetail", () => {
    it("should fetch station booking detail successfully", async () => {
      const stationId = "station-with-special-chars-123";
      const bookingId = "booking-with-dashes-456";
      mockStationsApiGet.mockResolvedValue({ data: MOCKED_GET_STATIONS_BOOKING_DETAIL_RESPONSE });
      const result = await getStationsBookingDetail(stationId, bookingId);
      expect(mockStationsApiGet).toHaveBeenCalledWith(`/stations/${stationId}/bookings/${bookingId}`);
      expect(result).toEqual(MOCKED_GET_STATIONS_BOOKING_DETAIL_RESPONSE);
    });
  });

  describe("stationsApi configuration", () => {
    it("should be created with correct configuration", () => {
      expect(stationsApi).toBeDefined();
      expect(stationsApi.get).toBeDefined();
    });
  });
});
