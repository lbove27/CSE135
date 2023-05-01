#!/usr/bin/env node

const { appendFile } = require('node:fs');
const querystring = require('node:querystring'); 
var fs = require("fs");

process.stdout.write("Content-Type: text/html\r\n\r\n");
process.stdout.write("<!DOCTYPE html>");
process.stdout.write("<html lang='en'>");
process.stdout.write("<head>");
process.stdout.write("<title>Node State Demo Page 1</title>");
process.stdout.write("</head>");
process.stdout.write("<body>");
process.stdout.write("<h1>Node State Demo Page 1</h1>");
process.stdout.write("<hr>");
let dirtyUrl = '';
let postStr = fs.readFileSync(0).toString();
if(postStr != '') {
    let name = postStr.split('=')[1];
    let spacedName = name.split('+');
    finalName = '';
    for(let word in spacedName) {
        finalName += (word + ' ');
    }
    dirtyUrl = "?" + postStr;
    print("<p>Your name is: " + finalName + "</p>");
}
else {
    let qStr = process.env.QUERY_STRING;
    let finalName = querystring.parse(qStr)[1];
    print("<p>Your name is: " + finalName + "</p>");
    dirtyUrl = "?" + qStr;
}
print("<a href='../cgibin/node-state-demo-2.js" + dirtyUrl + "'>Page 2</a>");
print("<a href='../forms/node-state-demo.html" + dirtyUrl + "'>Back to form</a>");


process.stdout.write("</body>");
process.stdout.write("</html>");