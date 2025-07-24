export const APP_ROUTES = {
  HOME: {
    path: "/",
    name: "home",
  },
  NOT_FOUND: {
    path: "/:pathMatch(.*)*",
    name: "not-found",
  },

  // Dashboard routes
  DASHBOARD: {
    path: "/dashboard",
    name: "dashboard",
  },

  STATIONS_BOOKING_DETAIL: {
    path: "/stations/:stationId/bookings/:bookingId",
    name: "stations-booking-detail",
  },
}
