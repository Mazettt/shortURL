#!/bin/bash

if [[ $1 == "-h" ]]; then
    echo "Use -b if you want to build the image before starting the app"
    echo "Use -rm if you want to remove the running container"
    exit 0
fi

if [[ $1 == "-rm" ]]; then
    docker stop mazettt-bitly
    docker rm mazettt-bitly
fi

if [[ $1 == "-b" ]]; then
    docker build -t mazettt:bitly .
fi

docker run --name="mazettt-bitly" --restart=always -d -p 3012:3012 mazettt:bitly
