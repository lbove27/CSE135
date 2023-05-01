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
    console.log(name);
    let spacedName = name.split('+');
    console.log(spacedName);
    let finalName = '';
    for(let val in spacedName) {
        finalName += (spacedName[val] + ' ');
    }
    console.log(finalName);
    dirtyUrl = "?" + postStr;
    process.stdout.write("<p>Your name is: " + finalName + "</p>");
}
else {
    let qStr = process.env.QUERY_STRING;
    let finalName = querystring.parse(qStr)[1];
    process.stdout.write("<p>Your name is: " + finalName + "</p>");
    dirtyUrl = "?" + qStr;
}
process.stdout.write("<a href='../cgibin/node-state-demo-2.js" + dirtyUrl + "'>Page 2</a>");
process.stdout.write("<a href='../forms/node-state-demo.html" + dirtyUrl + "'>Back to form</a>");
process.stdout.write("<form>");
process.stdout.write("<button action='../cgibin/node-state-destroy.js'>Destroy Session</button>");
process.stdout.write("</form>");
process.stdout.write("</body>");
process.stdout.write("</html>");