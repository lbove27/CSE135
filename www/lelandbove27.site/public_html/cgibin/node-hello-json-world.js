#!/usr/bin/env node

process.stdout.write("Content-Type: text/html\r\n\r\n");

obj = {
    "title": "Node Hello JSON World",
    "message": "Hello World from Node",
    "heading": "Node Hello JSON World",
    "date": Date(),
    "ipAddress": process.env.REMOTE_ADDR
}

jsonObj = JSON.stringify(obj);

process.stdout.write(jsonObj);
