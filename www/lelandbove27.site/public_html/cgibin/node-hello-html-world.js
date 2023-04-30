#!/usr/bin/env node

process.stdout.write("Content-Type: text/html\r\n\r\n");
process.stdout.write("<!DOCTYPE html>");
process.stdout.write("<html lang='en'>");
process.stdout.write("<head>");
process.stdout.write("<title>Node Hello HTML World</title>");
process.stdout.write("</head>");
process.stdout.write("<body>");
process.stdout.write("<h1>Node Hello HTML World</h1>");
process.stdout.write("<p>Hello World!</p>");
process.stdout.write("<p>IP address: " + process.env + "</p>");
process.stdout.write("</body>");
process.stdout.write("</html>");

