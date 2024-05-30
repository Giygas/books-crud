// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  // Your custom configs here
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  ignores: ["./components/ui/button/*.vue", "components/ui/**/*/"],
  rules: {
    "vue/html-end-tags": "off",
    "vue/html-quotes": "off",
    "vue/html-self-closing": "off",
  },
});
