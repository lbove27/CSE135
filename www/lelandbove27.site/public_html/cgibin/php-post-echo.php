<!DOCTYPE html>
<html lang="en">
    <head>
        <title>PHP POST Echo</title> 
    </head>
    <body>
        <h1>PHP POST Echo</h1>
        <hr>
        <p><b>Message body: </b></p>
        <ul>
        <?php
            foreach($_POST as $query => $value) {
                print "<li> <b>$query: </b>$value </li>";
            }
        ?>
        </ul>
    </body>
</html>