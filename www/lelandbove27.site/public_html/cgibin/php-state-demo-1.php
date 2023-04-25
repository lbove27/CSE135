<?php
    print "<!DOCTYPE html>";
    print "<html lang='en'>";
    print "<title>PHP Sessions Page 1</title>";
    print "</head>";
    print "<body>";
    print "<h1>PHP Sessions Page 1</h1>";
    print "<form action='' method='GET'>";
    print "<input type='text' name='sessionVal'>";
    print "<input type='submit' name='submit-form'>";
    print "</form>";
    print "<p>Current Session Value: " . $_GET['sessionVal'] . "</p>";
    setcookie("sessionCookie", $_GET['sessionVal']);
    print "<a href='php-state-demo-2.php'>Page 2</a>";
    print "</body>";
    print "</html>";
?>