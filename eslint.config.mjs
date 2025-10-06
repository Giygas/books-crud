// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  // Your custom configs here
  ignores: [
    "/components/ui/**",
    "**/components/ui/**",
    "node_modules/**",
    ".nuxt/**",
    "dist/**",
  ],
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  rules: {
    "vue/html-end-tags": "off",
    "vue/html-quotes": "off",
    "vue/html-self-closing": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/require-default-prop": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-useless-catch": "off",
  },
});
