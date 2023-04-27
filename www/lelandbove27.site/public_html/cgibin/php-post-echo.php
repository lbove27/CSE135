<!DOCTYPE html>
<html lang="en">
    <head>
        <title>PHP POST Echo</title> 
    </head>
    <body>
        <h1>PHP POST Echo</h1>
        <ul>
        <?php
            foreach($_POST as $query => $value) {
                print "<li> $query: $value </li>";
            }
        ?>
        </ul>
    </body>
</html>