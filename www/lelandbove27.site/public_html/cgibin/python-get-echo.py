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
print ('<h2>Environment Variables: </h2>');
queryStr = os.environ['QUERY_STRING']
print ('<p>Query String: ' + queryStr + '</p>');
print ('<ul>');
params = queryStr.split('&');
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