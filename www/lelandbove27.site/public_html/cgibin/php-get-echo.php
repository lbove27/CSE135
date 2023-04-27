<?php
    print "<!DOCTYPE html>";
    print "<html lang='en'>";
    print "<head><title>PHP GET Echo</title></head>";
    print "<body>";
    print "<h1>PHP GET Echo</h1>";
    print "<p>Query String: " . $_SERVER['QUERY_STRING'] . "</p>";
    $queries = [];
    parse_str($_SERVER['QUERY_STRING'], $queries);
    foreach($_GET as $query => $value) {
        print "<p> $query: $value </p>";
    }
    print "</body>";
    print "</html>";
?>