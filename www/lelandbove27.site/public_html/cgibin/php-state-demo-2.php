<?php
    print "<!DOCTYPE html>";
    print "<html lang='en'>";
    print "<head>";
    print "<title>PHP Sessions Page 2</title>";
    print "</head>";
    print "<body>";
    print "<h1>PHP Sessions Page 2</h1>";
    session_start();
    print "<p>Here is your session value: " . $_SESSION["session-var"] . "</p>";
    print "<a href='./php-state-demo-1.php'>Page 1</a>";
    print "</body>";
    print "</html>";
?>