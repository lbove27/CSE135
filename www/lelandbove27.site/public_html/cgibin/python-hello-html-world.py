#!/usr/bin/python3

from datetime import date;

print ("Content-type:text/html\n")
print ('<html>')
print ('<head>')
print ('<title>Python Hello HTML World</title>')
print ('</head>')
print ('<body>')
print ('<h1>Python Hello HTML World</h1>')
print ('<hr>')
print ('<p>Hello World</p>')
print ('<p>This page was generated with the Python Programming Language</p>')
print ('<p>This program was run at: ' + date.today() + '</p>')
print ('<p>Your current IP address is: ' + '')
print ('</body>')
print ('</html>')