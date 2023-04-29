#!/usr/bin/env python3

import sys;
import os;
 
print ("Content-type:text/html\n");
print ('<html>');
print ('<head>');
print ('<title>Python POST Echo</title>');
print ('</head>');
print ('<body>');
print ('<h1>Python POST Echo</h1>'); 
print ('<hr>');
print ('<ul>');
data = sys.stdin.read();
value = data.split('=');
value[1].split('+');
data_str = '';
for word in data:
    data_str += (word + ' ');
print ('</ul>');       
print ('</body>');
print ('</html>');