import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "prefer-const": "error",
      "no-console": "warn",
<<<<<<< HEAD
      "no-explicit-any":"warn",
=======
      
      // ✅ TypeScript-specific rule (FIX)
      "@typescript-eslint/no-unused-vars":"warn",
      "@typescript-eslint/no-explicit-any": "warn",
>>>>>>> 4328192 (Fix Vercel DB connection and serverless setup)
    },
  },
  {
    ignores: ["**/node_modules/", "**/dist/"],
  }
<<<<<<< HEAD
);
=======
);
>>>>>>> 4328192 (Fix Vercel DB connection and serverless setup)
