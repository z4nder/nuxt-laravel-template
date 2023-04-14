// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    apiSecret: "my-app-secutiry-api-key",
    public: {
      apiBase: "localhost:8000/api",
    },
  },
});
