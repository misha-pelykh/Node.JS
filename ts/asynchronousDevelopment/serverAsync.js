var http = require('http');
var fs = require('fs');

http.createServer(function(request, respond){
    var contents;

    if (request.url == '/') {

        fs.readFile('index.html', 'utf-8', function(err, contents) {
            if (err) {
                console.error(err);
                respond.statusCode = 500;
                respond.end('The error occurred on the server!');
                return;
            }

            respond.end(contents);
        });

    } else if (request.url == '/now') {
        respond.end(new Date().toString());
    } else { /* 404 */ }

}).listen(3000);