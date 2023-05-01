#!/usr/bin/env node

const querystring = require('node:querystring'); 
const { appendFile } = require('node:fs'); 
var fs = require("fs");

process.stdout.write("Content-Type: text/html\r\n\r\n");
process.stdout.write("<!DOCTYPE html>");
process.stdout.write("<html lang='en'>");
process.stdout.write("<head>");
process.stdout.write("<title>Node General Request Echo</title>");
process.stdout.write("</head>");
process.stdout.write("<body>");
process.stdout.write("<h1>Node General Reqeust Echo</h1>");
process.stdout.write("<hr>");
process.stdout.write("<p>Request Method: " + process.env.REQUEST_METHOD + "</p>");
process.stdout.write("<p>Protocol: " + process.env.SERVER_PROTOCOL + "</p>");
qStr = process.env.QUERY_STRING;
process.stdout.write("<p><b>Query string: </b>" + qStr + "</p>");
process.stdout.write("<ul>");
values = querystring.parse(qStr);
for(let val in values) {
    process.stdout.write("<li><b>" + val + ":</b> " + values[val] + "</li>");
}
process.stdout.write("</ul>");
process.stdout.write("<hr>");
process.stdout.write("<ul>");
let stdin = fs.readFileSync(0).toString();
process.stdout.write("<p><b>Message Body: </b></p>");
process.stdout.write("<ul>");
postvalues = querystring.parse(stdin);
for(let val in postvalues) {
    process.stdout.write("<li><b>" + val + ":</b> " + postvalues[val] + "</li>");
}
process.stdout.write("</ul>");
process.stdout.write("</body>");
process.stdout.write("</html>");