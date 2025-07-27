export const APP_ROUTES = {
  NOT_FOUND: {
    path: "/:pathMatch(.*)*",
    name: "not-found",
  },

  // Dashboard routes
  DASHBOARD: {
    path: "/",
    name: "dashboard",
  },

  STATIONS_BOOKING_DETAIL: {
    path: "/stations/:stationId/bookings/:bookingId",
    name: "stations-booking-detail",
  },
}
