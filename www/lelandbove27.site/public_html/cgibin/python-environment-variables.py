#!/usr/bin/env python3

import os;
 
print ("Content-type:text/html\n");
print ('<html>');
print ('<head>');
print ('<title>Python Environment Variables</title>');
print ('</head>');
print ('<body>');
print ('<h1>Python Environment Variables</h1>'); 
print ('<hr>');
print ('<h2>Environment Variables: ');
print ('<ul>');
for key, value in os.environ.items():
    print ('<li>' + key + ': ' + value + '</li>');
print ('</ul>');
print ('</body>');
print ('</html>');