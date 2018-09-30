var fs = require('fs');
fs.unlink('./index.html', function (error) {
    console.log('remove index.html');
});
var express = require('express');
var minify = require('./_minify');
var pugbuild = require('./_pugbuild');

var app = express();
app.use(express.static('./'));
app.set('views', './');
app.set('view engine', 'pug');
app.get('/', function (req, res) {
    res.render('index', pugbuild.data);
});

app.listen(3000, function () {
    minify = require('./_minify');
    console.log('Example app listening on port 3000!');
});