const fs = require('fs');

module.exports = {
  baseUrl: '/',
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        outputStyle: 'nested',
        data: fs.readFileSync('src/variables.scss', 'utf-8')
      }
    }
  }
}