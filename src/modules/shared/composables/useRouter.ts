import { useRouter as useVueRouter, useRoute } from "vue-router"

import { APP_ROUTES } from "@/modules/core/constants/routes"

export function useAppRouter() {
  const router = useVueRouter()
  const route = useRoute()

  const navigateTo = {
<<<<<<< Updated upstream
    dashboard: () => router.push({ name: APP_ROUTES.DASHBOARD.name }),

    stationsBookingDetail: (stationId: string, bookingId: string) =>
      router.push({ name: APP_ROUTES.STATIONS_BOOKING_DETAIL.name, params: { stationId, bookingId } }),
=======
    dashboard: () => router.push({ name: APP_ROUTES.DASHBOARD.children.CALENDAR.name }),

    bookingDetail: (stationId: string, bookingId: string) =>
      router.push({ name: APP_ROUTES.BOOKINGS.children.DETAIL.name, params: { stationId, bookingId } }),
>>>>>>> Stashed changes

    back: () => router.back(),

    home: () => router.push({ name: APP_ROUTES.HOME.name }),
  }

  return {
    router,
    route,
    navigateTo,
<<<<<<< Updated upstream
=======
    buildRoute,
>>>>>>> Stashed changes
  }
}
