<!DOCTYPE html>
<html lang="en">
    <head>
        <title>PHP General Request Echo</title> 
    </head>
    <body>
        <h1>PHP General Request Echo</h1>
        <?php
         print "<p>Request Method: " . $_SERVER["REQUEST_METHOD"] . "</p>";
         print "<p>Protocol: " . $_SERVER["SERVER_PROTOCOL"] . "</p>";
         print "<p><b>Query String: </b>" . $_SERVER['QUERY_STRING'] . "</p>";
         print "<ul>";
         if($_SERVER["REQUEST_METHOD"] == "GET") {
            foreach($_REQUEST as $query => $value) {
                print "<li> <b>$query: </b>$value </li>";
            }
         }  
         print "</ul>";
         print "<p><b>Message Body: </b></p>";
         print "<ul>";
         if($_SERVER["REQUEST_METHOD"] == "POST") {
            foreach($_REQUEST as $query => $value) {
                print "<li> <b>$query:</b> $value </li>";
            }
         }  
         print "</ul>";
         
        ?>
    </body>
</html>