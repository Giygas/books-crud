// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt({
  // Your custom configs here
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  rules: {
    "vue/html-end-tags": "off",
    "vue/html-quotes": "off",
    "vue/html-self-closing": "off",
  },
})
