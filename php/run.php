<?php
    header("Access-Control-Allow-Origin: http://projectplay.xyz");
    header("Access-Control-Allow-Origin: http://reline.github.io");

    $rootDir = "..";

    if($_GET) {

        // todo: $_POST['peer'] <- use as filename to be compiled
        if(!$_GET['script']) {
            echo "Error: Script field is required";
            exit();
        }

        $script = $_GET['script'];

        $message = shell_exec("/bin/bash $rootDir/bash/compile.sh '$script' 2>&1");
        echo $message;
    }
?>
