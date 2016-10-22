#!/bin/bash
# WARNING! DO NOT CHANGE THIS FILE REMOTELY FROM WINDOWS ENV DUE TO *NIX SPECFIC LINE ENDINGS

rootDir=".."
content=$1 # set content equal to the first argument
script="$rootDir/scripts/user_script.cpp" # create a cpp file
echo "$content" > "$script" # echo the code into the file

# compile script
g++ "$script"
#echo $(whoami) # returns www-data
# run program and return output
var=$($rootDir/php/a.out)
echo "$var"
