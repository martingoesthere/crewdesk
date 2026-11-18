import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Only run the real tests in src/. Never the compiled copies in dist/.
    include: ["src/**/*.test.ts"],
  },
});
