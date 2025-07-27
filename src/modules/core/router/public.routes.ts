import type { RouteRecordRaw } from "vue-router"

import { dashboardRoutes } from "@/modules/dashboard/dashboard.routes"

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/modules/shared/layouts/BaseLayout.vue"),
    children: [...dashboardRoutes],
  },
]
