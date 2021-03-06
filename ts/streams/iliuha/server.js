const fs = require('fs');

// var readStream = fs.createReadStream('z-read.md');
var readStream = new fs.ReadStream('z-read.md');

readStream.setEncoding('utf-8');

readStream.on('readable', () => {
    var data = readStream.read();
    if (data) console.log(data.length);
});

readStream.on('end', () => {
    console.log('[~!end]');
});

readStream.on('error', (err) => {
    console.log(err);
});