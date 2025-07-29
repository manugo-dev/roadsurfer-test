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
        exclude: ["**/*.config.ts", "**/*.d.ts", "**/*.types.ts", "src/test/**", "dist"],
      },
    },
  }),
);
