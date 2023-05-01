#!/usr/bin/env node

process.stdout.write("Content-Type: text/html\r\n\r\n");
process.stdout.write("<!DOCTYPE html>");
process.stdout.write("<html lang='en'>");
process.stdout.write("<head>");
process.stdout.write("<title>Node GET Echo</title>");
process.stdout.write("</head>");
process.stdout.write("<body>");
process.stdout.write("<h1>Node GET Echo</h1>");
process.stdout.write("<hr>");
qStr = process.env.QUERY_STRING;
process.stdout.write("<p><b>Query string: </b>" + qStr + "</p>");
process.stdout.write("<ul>");
values = qStr.parse();
for(let val in values) {
    process.stdout.write("<li><b>" + val + ":</b> " + values[val] + "</li>");
}
process.stdout.write("</ul>");
process.stdout.write("</body>");
process.stdout.write("</html>");