#!/usr/bin/env python3

import datetime;
import socket;
import requests;
from flask import request; 
 
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
datetime_str = datetime.datetime.now().strftime("%m/%d/%Y %H:%M:%S");
print ('<p>This program was run at: ' + datetime_str + '</p>');
name = socket.gethostname();
ip = socket.gethostbyname(name);
print (request.environ.get('HTTP_X_REAL_IP', request.remote_addr));
print ('<p>Your current IP address is: ' + ip);
print ('</body>');
print ('</html>');