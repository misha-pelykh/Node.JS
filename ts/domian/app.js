const domain = require('domain');

var appDomain = domain.create();
var server;

appDomain.on('error', function(err) {
    console.error("[appDomain] %s", err);

    if (server) server.close();

    setTimeout(function(){
        process.exit(1);
    }, 1000).unref();
});

appDomain.run(function() {
    var http = require('http');
    var handler = require('./handler');

    server = http.createServer(function(req, res) {
        var reqDomain = domain.create();

        reqDomain.add(req);
        reqDomain.add(res);

        reqDomain.on('error', function(err) {
            res.statusCode = 500;
            res.end(err.toString());
            // ...
            appDomain.emit('error', err);
        });

        reqDomain.run(function() {
            handler(req, res);
        });
    });

    server.listen(3000);
});