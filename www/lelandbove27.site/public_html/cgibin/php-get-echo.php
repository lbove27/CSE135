<?php
    print "<!DOCTYPE html>";
    print "<html lang='en'>";
    print "<head><title>PHP GET Echo</title></head>";
    print "<body>";
    print "<h1>PHP GET Echo</h1>";
    print "<hr>";
    print "<p><b>Query String: </b>" . $_SERVER['QUERY_STRING'] . "</p>";
    print "<ul>";
    $queries = [];
    parse_str($_SERVER['QUERY_STRING'], $queries);
    foreach($_GET as $query => $value) {
        print "<li> <b>$query</b>: $value </li>";
    }
    print "</ul>";
    print "</body>";
    print "</html>";
?>