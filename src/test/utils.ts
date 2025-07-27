import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { mount, VueWrapper } from "@vue/test-utils";
import { createPinia, type Pinia } from "pinia";
import type { Component } from "vue";
import { createRouter, createWebHistory, type Router } from "vue-router";

import { APP_ROUTES } from "@/modules/core/constants/routes";

/**
 * Create a test router with mock routes
 */
export function createTestRouter(): Router {
  const routes = [
    { path: "/", component: { template: "<div>Home</div>" } },
    { path: "/not-found", name: APP_ROUTES.NOT_FOUND.name, component: { template: "<div>Not Found</div>" } },
    { path: "/dashboard", name: APP_ROUTES.DASHBOARD.name, component: { template: "<div>Dashboard</div>" } },
  ];

  return createRouter({
    history: createWebHistory(),
    routes,
  });
}

/**
 * Create a test Pinia store
 */
export function createTestPinia(): Pinia {
  return createPinia();
}

/**
 * Create a test QueryClient for Vue Query
 */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/**
 * Mount a Vue component with common testing providers
 */
export function mountWithProviders(
  component: Component,
  options: {
    props?: Record<string, unknown>;
    router?: Router;
    pinia?: Pinia;
    queryClient?: QueryClient;
    global?: {
      plugins?: Array<unknown>;
      provide?: Record<string, unknown>;
      stubs?: Record<string, unknown>;
    };
  } = {},
): VueWrapper {
  const {
    props = {},
    router = createTestRouter(),
    pinia = createTestPinia(),
    queryClient = createTestQueryClient(),
    global = {},
  } = options;

  const plugins = [router, pinia, [VueQueryPlugin, { queryClient }], ...(global.plugins || [])];

  return mount(component, {
    props,
    global: {
      ...global,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      plugins: plugins as any,
      provide: {
        ...global.provide,
      },
      stubs: {
        RouterLink: true,
        RouterView: true,
        ...global.stubs,
      },
    },
  });
}

/**
 * Helper to create a mock HTTP response
 */
export function createMockResponse<T>(data: T, status = 200) {
  return {
    data,
    status,
    statusText: "OK",
    headers: {},
    config: {},
  };
}

/**
 * Helper to create a mock error response
 */
export function createMockErrorResponse(message = "Network Error", status = 500) {
  const error = new Error(message) as Error & { response?: { status: number; data?: unknown } };
  error.response = { status, data: { message } };
  return error;
}
