#!/bin/bash

# create script file and fill with content
content=$1
script="/var/www/html/cloudpad/scripts/user_script.cpp"
echo "$content" > "$script"

# compile script
g++ "$script"

# run program and return output
var=$(/var/www/html/cloudpad/php/a.out)
echo "$var"
