<?php
    print "<!DOCTYPE html>";
    print "<html lang='en'>";
    print "<title>PHP Sessions Page 1</title>";
    print "</head>";
    print "<body>";
    print "<h1>PHP Session Destroy</h1>";
    //session_name('session-var');
    session_destroy();
    print "<p>Session has been destroyed.</p>";
    print "<br>";
    print "<a href='../forms/php-state-demo.html'>Back to form</a>";
    print "<br>";
    print "<a href='php-state-demo-1.php'>Page 1</a>\n";
    print "<br>";
    print "<a href='php-state-demo-2.php'>Page 2</a>\n";
    print "<br>";
    print "</body>";
    print "</html>";
?>