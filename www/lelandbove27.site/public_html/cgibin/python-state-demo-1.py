#!/usr/bin/env python3

import sys;
import os;
 
print ("Content-type:text/html\n");
print ('<html>');
print ('<head>');
print ('<title>Python State Demo Page 1</title>');
print ('</head>');
print ('<body>');
print ('<h1>Python State Demo Page 1</h1>'); 
print ('<hr>');
querystr = os.environ['QUERY_STRING'];
dirtyname = querystr.split('=');
cleanname = dirtyname.split('+');
name = '';
for part in cleanname:
    name += part + ' ';
print ('<p>Your name: ' + name + '</p>');

print ('</body>');
print ('</html>');