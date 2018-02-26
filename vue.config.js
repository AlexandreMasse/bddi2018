const fs = require('fs');

module.exports = {
  baseUrl: '/',
  css: {
    //sourceMap: true,
    loaderOptions: {
      sass: {
        data: '@import "~@/stylesheets/global.scss";'
      }
    }
  }
}