#!/usr/bin/env node

process.stdout.write("Content-Type: text/plain\r\n\r\n");
process.stdout.write("Hello, world");
/*
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
}).listen(3000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:3000/');
*/