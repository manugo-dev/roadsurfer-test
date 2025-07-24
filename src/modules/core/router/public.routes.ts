import type { RouteRecordRaw } from "vue-router"

import { APP_ROUTES } from "@/modules/core/constants/routes"

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: APP_ROUTES.HOME.path,
    name: APP_ROUTES.HOME.name,
    component: () => import("@/modules/core/views/HomeView.vue"),
  },
  {
    path: APP_ROUTES.NOT_FOUND.path,
    name: APP_ROUTES.NOT_FOUND.name,
    component: () => import("@/modules/core/views/ErrorView.vue"),
  },
]
