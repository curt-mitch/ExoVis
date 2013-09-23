var express = require('express');
var app = express();

//new call to compress content
app.use(express.compress());

app.use(express.static(__dirname));

app.listen(process.env.PORT || 3000);