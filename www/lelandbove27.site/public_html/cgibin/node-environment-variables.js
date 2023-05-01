#!/usr/bin/env node

process.stdout.write("Content-Type: text/html\r\n\r\n");
process.stdout.write("<!DOCTYPE html>");
process.stdout.write("<html lang='en'>");
process.stdout.write("<head>");
process.stdout.write("<title>Node Environment Variables</title>");
process.stdout.write("</head>");
process.stdout.write("<body>");
process.stdout.write("<h1>Node Environment Variables</h1>");
process.stdout.write("<hr>");
process.stdout.write("<ul>");
for(let property in process.env) {
    process.stdout.write("<li><b>" + property + ": </b>" +  process.env[property] + "</li>");
}
process.stdout.write("</ul>");
process.stdout.write("</body>");
process.stdout.write("</html>");