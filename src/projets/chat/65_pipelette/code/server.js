let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');
app = express();
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())
app.use(serveStatic(__dirname));

let port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
