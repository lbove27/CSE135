<?php
    print "<!DOCTYPE html>";
    print "<html lang='en'>";
    print "<head>";
    print "<title>PHP Sessions Page 2</title>";
    print "</head>";
    print "<body>";
    print "<h1>PHP Sessions Page 2</h1>";
    session_name('session-var');
    session_start();
    print "<p>Current session value: " . $_SESSION["session-var"] . "</p>";
    print "<a href='./php-state-demo-1.php'>Page 1</a>\n";
    print "<a href='../forms/php-state-demo.html'>Back to form</a>\n";
    print "<form action='./php-state-destroy.php' method=get>";
    print "<button type='submit' id='destroy-session'>Destroy session</button>";
    print "</form>";
    print "</body>";
    print "</html>";
?>