#!/usr/bin/python3

from datetime import datetime;
import cgi;

print ("Content-type:text/html\n");
print ('<html>');
print ('<head>');
print ('<title>Python Hello HTML World</title>');
print ('</head>');
print ('<body>');
print ('<h1>Python Hello HTML World</h1>');
print ('<hr>');
print ('<p>Hello World</p>');
print ('<p>This page was generated with the Python programming language</p>');
datetime_str = datetime.now.strftime("%d/%m/%Y %H:%M:%S");
print ('<p>This program was run at: ' + datetime_str + '</p>');
print ('<p>Your current IP address is: ' + '');
print ('</body>');
print ('</html>');