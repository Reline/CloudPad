#!/bin/bash

content=$1 # set content equal to the first argument
script="/var/www/html/cloudpad/scripts/user_script.cpp" # create a cpp file
echo "$content" > "$script" # echo the code into the file

# compile script
g++ "$script"

# run program and return output
var=$(/var/www/html/cloudpad/php/a.out)
echo "$var"
