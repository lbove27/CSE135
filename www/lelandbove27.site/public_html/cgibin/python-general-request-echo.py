#!/usr/bin/env python3

import sys;
import os;
 
print ("Content-type:text/html\n");
print ('<html>');
print ('<head>');
print ('<title>Python General Request Echo</title>');
print ('</head>');
print ('<body>');
print ('<h1>Python General Request Echo</h1>'); 
print ('<hr>');
print ('<p>Request Method: ' + os.environ['REQUEST_METHOD'] + '</p>');
print ('<hr>');
print ('<p>Protocol: ' + os.environ['SERVER_PROTOCOL'] + '</p>');
print ('<hr>');
queryStr = os.environ['QUERY_STRING'];
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
print ('<hr>');
print ('<ul>');
postdata = sys.stdin.read();
postvalue = postdata.split('=');
postvalues = postvalue[1].split('+');
data_str = '';
for word in postvalues:
    data_str += (word + ' ');
print ('<li><b>Message body: </b>' + data_str + '</li>');
print ('</ul>');       
print ('</body>');
print ('</html>');