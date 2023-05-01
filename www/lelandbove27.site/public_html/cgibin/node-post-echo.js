#!/usr/bin/env node

const querystring = require('node:querystring'); 

process.stdout.write("Content-Type: text/html\r\n\r\n");
process.stdout.write("<!DOCTYPE html>");
process.stdout.write("<html lang='en'>");
process.stdout.write("<head>");
process.stdout.write("<title>Node POST Echo</title>");
process.stdout.write("</head>");
process.stdout.write("<body>");
process.stdout.write("<h1>Node POST Echo</h1>");
process.stdout.write("<hr>");
messageBody = process.stdin;
console.log(messageBody);
process.stdout.write("<p><b>Message Body:</p>");
process.stdout.write("<ul>");
values = querystring.parse(qStr);
for(let val in values) {
    process.stdout.write("<li><b>" + val + ":</b> " + values[val] + "</li>");
}
process.stdout.write("</ul>");
process.stdout.write("</body>");
process.stdout.write("</html>");