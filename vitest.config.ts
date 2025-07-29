import { mergeConfig, defineConfig, configDefaults } from "vitest/config";

import { fileURLToPath } from "node:url";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      setupFiles: ["./src/test/setup.ts"],
      coverage: {
        provider: "v8",
        exclude: [
          "**/*.config.mjs",
          "**/*.config.ts",
          "**/*.d.ts",
          "**/*.keys.ts",
          "**/*.mocks.ts",
          "**/*.routes.ts",
          "**/*.types.ts",
          "src/test/**",
          "dist",
        ],
        thresholds: {
          statements: 80,
          functions: 80,
          branches: 80,
          lines: 80,
        },
      },
    },
  }),
);
