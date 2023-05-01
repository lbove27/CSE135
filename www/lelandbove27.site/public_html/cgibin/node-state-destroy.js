#!/usr/bin/env node

const { appendFile } = require('node:fs');
const querystring = require('node:querystring'); 
var fs = require("fs");

process.stdout.write("Content-Type: text/html\r\n\r\n");
process.stdout.write("<!DOCTYPE html>");
process.stdout.write("<html lang='en'>");
process.stdout.write("<head>");
process.stdout.write("<title>Node State Destroy</title>");
process.stdout.write("</head>");
process.stdout.write("<body>");
process.stdout.write("<h1>Node State Destroy</h1>");
process.stdout.write("<hr>");
console.log("<p>State Destroyed</p>");
process.stdout.write("<a href='../cgibin/node-state-demo-1.js'>Page 1</a>");
console.log("<br>");
process.stdout.write("<a href='../cgibin/node-state-demo-2.js'>Page 2</a>");
console.log("<br>");
process.stdout.write("<a href='../forms/node-state-demo.html'>Back to form</a>");
process.stdout.write("</body>");
process.stdout.write("</html>");