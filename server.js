const os = require('os');

const static = require('node-static');

const fileServer = new static.Server('./release', {cache: 0});
const port = parseInt(process.argv[2] || "1337");

require('http').createServer(
    (request, response) => {
        request.addListener(
            'end',
            () => {
                fileServer.serve(request, response);
            }
        ).resume();
    }
).listen(
    port,
    "0.0.0.0",
    () => console.log(`running ${os.hostname()}:${port}`)
);
