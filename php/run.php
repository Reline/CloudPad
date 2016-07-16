<?php
    header("Access-Control-Allow-Origin: http://198.199.94.36");
    header("Access-Control-Allow-Origin: http://reline.github.io");

    if($_GET) {

        // todo: $_POST['peer'] <- use as filename to be compiled
        if(!$_GET['script']) {
            echo "Error: Script field is required";
            exit();
        }

        $script = $_GET['script'];

        $message = shell_exec("/bin/bash /var/www/html/cloudpad/bash/compile.sh '$script' 2>&1");
        echo $message;
    }
?>