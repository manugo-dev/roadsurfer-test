import { createRouter, createWebHistory } from "vue-router"

import { publicRoutes } from "./public.routes"

import { APP_ROUTES } from "../constants/routes"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...publicRoutes,
    {
      path: APP_ROUTES.NOT_FOUND.path,
      name: APP_ROUTES.NOT_FOUND.name,
      component: () => import("@/modules/core/views/ErrorView.vue"),
    },
  ],
})

export default router
