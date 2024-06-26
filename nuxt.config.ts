// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/library": { ssr: false },
  },
  typescript: {
    typeCheck: true,
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  telemetry: false,
  runtimeConfig: {
    turso: {
      url: process.env.TURSO_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "@nuxt/image",
  ],
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
})
