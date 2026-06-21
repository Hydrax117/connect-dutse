import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Disable ESLint formatting rules that conflict with Prettier
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "prisma/migrations/**"]),
]);

export default eslintConfig;
