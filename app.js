const express = require('express')
const app = express();
const port = 3200;
const serveStatic = require('serve-static');


app.use(serveStatic('public', { 'index': ['index.html', 'index.htm'] }))
app.listen(port)