#!/usr/bin/env python3

import sys;
import os;
 
print ("Content-type:text/html\n");
print ('<html>');
print ('<head>');
print ('<title>Python Destroy State</title>');
print ('</head>');
print ('<body>');
print ('<h1>Python Destroy State</h1>'); 
print ('<hr>');
print ('<a href=../forms/python-state-demo.html>Back to form</a>');
print ('<br>');
print ('<a href=../cgibin/python-state-demo-1.py>Page 1</a>');
print ('<br>');
print ('<a href=../cgibin/python-state-demo-2.py>Page 2</a>');
print ('<br>');
print ("<form action='./php-state-destroy.php' method=get>");
print ("<button type='submit' id='destroy-session'>Destroy session</button>");
print ("</form>");
print ('</body>');
print ('</html>');