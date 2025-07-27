import type { RouteRecordRaw } from "vue-router"

import { APP_ROUTES } from "../core/constants/routes"

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: APP_ROUTES.DASHBOARD.path,
    name: APP_ROUTES.DASHBOARD.name,
    component: () => import("@/modules/dashboard/views/DashboardView.vue"),
  },
]
