<?php
    print "<!DOCTYPE html>";
    print "<html lang='en'>";
    print "<title>PHP Sessions Page 1</title>";
    print "</head>";
    print "<body>";
    print "<h1>PHP Sessions Page 1</h1>";
    session_name('session-var');
    session_destroy();
    print "<a href='../forms/php-state-demo.html'>Back to form</a>";
    print "<a href='php-state-demo-1.php'>Page 1</a>";
    print "<a href='php-state-demo-2.php'>Page 2</a>";
    print "</body>";
    print "</html>";
?>