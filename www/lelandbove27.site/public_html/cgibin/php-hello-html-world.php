<!DOCTYPE html>
<html lang="en">
<body>
    <?php
        print "<h1>PHP Hello World HTML</h1>";
        echo "Hello World\n";
        print "<br>";
        echo "Date: " . date("jS F Y h:i:s");
        print "<br>";
        echo "User IP Address: ";
        echo $_SERVER["REMOTE_ADDR"];
    ?>
</body>
</html>