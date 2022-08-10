module.exports = {
  devServer: {
    port: 8081,
   // proxy: 'https://localhost:8080'
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    }}
}