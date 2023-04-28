#!/usr/bin/env python3

import datetime;
import os;
import json;

print ("Content-type:text/html\n");

datetime_str = datetime.datetime.now().strftime("%m/%d/%Y %H:%M:%S");
pythonObj = {
    "title": "Python Hello JSON World", 
    "heading": "Python Hello JSON World",
    "message": "This page was generated with the Python programming language",
    "time":  datetime_str,
    "IPAddress": os.environ["REMOTE_ADDR"]
}

print(json.dumps(pythonObj));