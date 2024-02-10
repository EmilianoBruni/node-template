# a bash script that get APP and SERVICE from environment and 
# replace all the occurences of fastify-mongoose and api in files 
# and in file and folder name with the values

# Usage: ./configure.sh <APP> <SERVICE>

# Example: ./configure.sh myapp myservice

# check if the number of arguments is correct
if [ "$#" -ne 2 ]; then
    echo "Illegal number of parameters"
    echo "Usage: ./configure.sh <APP> <SERVICE>"
    exit 1
fi

# get the arguments
APP=$1
SERVICE=$2

export APP=$APP SERVICE=$SERVICE

find . -type f ! -path "./configure.sh" -exec sed -i "s/%%APP%%/$APP/ig" {} +
find . -type f ! -path "./configure.sh" -exec sed -i "s/%%SERVICE%%/$SERVICE/ig" {} +

# replace all the occurences of %%APP%%  file and folder names
find . -depth -iname "*%%APP%%*" -exec sh -c 'set {};res=$(echo "$1" | sed "s/%%APP%%/$APP/ig"); mv "$1" "$res"' \;
find . -depth -iname "*%%SERVICE%%*" -exec sh -c 'set {};res=$(echo "$1" | sed "s/%%SERVICE%%/$SERVICE/ig"); mv "$1" "$res"' \;

# remove the configure.sh file
rm configure.sh

# unlink the git folder
rm -rf .git


