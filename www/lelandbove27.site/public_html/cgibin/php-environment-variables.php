<?php
    print "<!DOCTYPE html>";
    print "<html>";
    print "<head>";
    print "<title>PHP Environment Variables</title>";
    print "<body>";
    print "<h1>PHP Environment Variables</h1>";
    print "<h2>Environment Variables</h2>";
    print "<ul>";
    foreach(getEnv() as $key => $val) {
        print "<li>$key: $val</li>";
    }
    print "</ul>";
    print "<h2>Server Variables</h2>";
    foreach($_SERVER as $key => $val) {
        print "<li><b>$key:</b> $val</li>";
    }
    print "</body>";
    print "</html>";
?>