exports.data = {
    pageTitle: 'uislide demo'
};

exports.build = function() {
    var fs = require('fs');
    var pug = require('pug');
    
    // var options = {
    //     pretty: true
    // };
    
    // use json data 
    // var obj;
    // fs.readFile('index.json', 'utf8', function (err, data) {
    //   if (err) throw err;
    //   obj = JSON.parse(data);
    // });
    // console.log(obj);
    
    var html = pug.renderFile('index.pug', this.data);
    
    fs.writeFile('./index.html', html, 'utf8', function (error) {
        console.log('success to write index.html');
    });
};
