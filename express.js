var express = require('express');
var pugbuild = require('./_pugbuild');

var app = express();
app.use(express.static('./'));
app.set('views', './');
app.set('view engine', 'pug');
app.get('/', function (req, res) {
    res.render('index', pugbuild.data);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});