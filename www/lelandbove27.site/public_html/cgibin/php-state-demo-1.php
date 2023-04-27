<?php
    print "<!DOCTYPE html>";
    print "<html lang='en'>";
    print "<title>PHP Sessions Page 1</title>";
    print "</head>";
    print "<body>";
    print "<h1>PHP Sessions Page 1</h1>";
    session_name('session-var');
    session_start();
    if($_POST['session-var'] == null) {
        print "<p>Current Session Value: " . $_SESSION['session-var'] . "</p>";
    }
    else if($_POST['session-var'] == null && $_SESSION['session-var'] == null) {
        print "<p>No value is currently set</p>";
    }
    else {
        print "<p>Current Session Value: " . $_POST['session-var'] . "</p>";
    }
    print "<a href='php-state-demo-2.php'>Page 2</a>";
    print "</body>";
    print "</html>";
?>