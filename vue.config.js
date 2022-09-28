module.exports = {
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/assets/styles/_variables.scss";
        `
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader',
        },
      ],
    }
  }
}



