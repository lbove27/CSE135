#!/usr/bin/env python3

import os;
 
print ("Content-type:text/html\n");
print ('<html>');
print ('<head>');
print ('<title>Python GET Echo</title>');
print ('</head>');
print ('<body>');
print ('<h1>Python GET Echo</h1>'); 
print ('<hr>');
queryStr = os.environ['QUERY_STRING']
print ('<p>Query String: ' + queryStr + '</p>');
print ('<ul>');
params = queryStr.split('&');
if(len(params) >= 1): 
    for param in params: 
        keyValuePair = param.split('=');
        values = keyValuePair[1].split('+');
        finalVal = '';
        for val in values:
            finalVal += (val + ' ');  
        print('<li><b>' + keyValuePair[0] + '</b>: ' + finalVal);
print ('</ul>');       
print ('</body>');
print ('</html>');