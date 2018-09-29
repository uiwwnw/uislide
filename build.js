var pugbuild = require('./_pugbuild');
pugbuild.build();

var compressor = require('node-minify');

// Using Google Closure Compiler
// compressor.minify({
//   compressor: 'gcc',
//   input: 'foo.js',
//   output: 'bar.js',
//   callback: function(err, min) {}
// });

// Using UglifyJS with wildcards
compressor.minify({
    compressor: 'uglifyjs',
    input: './src/*.js',
    output: './dist/uiSlide.js',
    callback: function (err, min) { }
});

// // With Promise
// var promise = compressor.minify({
//   compressor: 'uglifyjs',
//   input: './**/*.js',
//   output: 'bar.js'
// });

// promise.then(function(min) {});