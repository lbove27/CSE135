<?php
    print "<!DOCTYPE html>";
    print "<html lang='en'>";
    print "<title>PHP Sessions Page 1</title>";
    print "</head>";
    print "<body>";
    print "<h1>PHP Sessions Page 1</h1>";
    session_name('session-var');
    session_start();
    if($_POST['session-var'] == '' && $_SESSION['session-var'] == '') {
        print "<p>No value is currently set</p>";
    }
    else if($_POST['session-var'] == '') {
        print "<p>Your name: " . $_SESSION['session-var'] . "</p>";
    }
    else {
        $_SESSION['session-var'] = $_POST['session-var'];
        print "<p>Your name: " . $_SESSION['session-var'] . "</p>";
    }
    print "<br>";
    print "<a href='php-state-demo-2.php'>Page 2</a>";
    print "<br>";
    print "<a href='../forms/php-state-demo.html'>Back to form</a>";
    print "<br>";
    print "<form action='./python-state-destroy.py' method=get>";
    print "<button type='submit' id='destroy-session'>Destroy session</button>";
    print "</form>";
    print "</body>";
    print "</html>";
?>