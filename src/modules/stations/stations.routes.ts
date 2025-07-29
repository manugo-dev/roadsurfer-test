import type { RouteRecordRaw } from "vue-router";

import { APP_ROUTES } from "@/modules/core/constants/routes";

export const stationRoutes: RouteRecordRaw[] = [
  {
    path: APP_ROUTES.STATIONS_BOOKING_DETAIL.path,
    name: APP_ROUTES.STATIONS_BOOKING_DETAIL.name,
    component: () => import("@/modules/stations/views/StationBooking.vue"),
  },
];
