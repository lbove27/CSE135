<!DOCTYPE html>
<html lang="en">
<head><title>PHP Hello JSON World</title></head>
<body>
<?php 
    $json_obj = (object)[];
    $json_obj->title = "Hello PHP!";
    $json_obj->heading = "Hello PHP!";
    $json_obj->message = "This page was generated using PHP";
    $json_obj->date = date("jS F Y h:i:s");
    $json_obj->IP = $_SERVER["REMOTE_ADDR"];
    $myJSON = json_encode($json_obj);
    echo $myJSON;
?>
</body>
<html>