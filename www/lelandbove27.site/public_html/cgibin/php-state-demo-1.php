<?php
    print "<!DOCTYPE html>";
    print "<html lang='en'>";
    print "<title>PHP Sessions Page 1</title>";
    print "</head>";
    print "<body>";
    print "<h1>PHP Sessions Page 1</h1>";
    print "<p>Current Session Value: " . $_GET['session-var'] . "</p>";
    setcookie("sessionCookie", $_GET['session-var']);
    print "<a href='php-state-demo-2.php'>Page 2</a>";
    print "</body>";
    print "</html>";
?>