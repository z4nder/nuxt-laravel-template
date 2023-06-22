// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      backendUrl: "http://localhost:8000/api",
      frontendUrl: "http://localhost:3000",
    },
  },
  imports: {
    dirs: ["./utils"],
  },
  pinia: {
    autoImports: [["defineStore", "definePiniaStore"]],
  },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/img/icon.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=DM+Sans&family=Nunito:wght@200;400;600&display=swap",
        },
      ],
    },
  },
});
