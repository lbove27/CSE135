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
dirtyurl = '';
data = sys.stdin.read();
if(data != ''):
    dirtyurl = data;
    dirtyname = data.split('=');
    cleanname = dirtyname[1].split('+');
    name = '';
    for part in cleanname:
        name += part + ' ';
    print ('<p>Your name: ' + name + '</p>');
else:
    qstr = os.environ['QUERY_STRING'];
    val = qstr.split('=');
    print ('<p>Your name: ' + val[1]);
print ('<hr>');
print ('<a href=../forms/python-state-demo.html' + dirtyurl + '>Back to form</a>');
print ('<br>');
print ('<a href=../cgibin/python-state-demo-2.py' + dirtyurl + '>Page 2</a>');
print ('</body>');
print ('</html>');