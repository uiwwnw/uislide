exports.minify = function() {
    var compressor = require('node-minify');

    compressor.minify({
        compressor: 'uglifyjs',
        input: './src/*.js',
        output: './dist/uiSlide.js',
        callback: function (err, min) { }
    });
}();