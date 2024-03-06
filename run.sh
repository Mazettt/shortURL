#!/bin/bash

imageTag=mazettt:bitly
containerName=mazettt-bitly

if [[ $1 == "-h" ]]; then
    echo "Use -b if you want to build the image before starting the app"
    echo "Use -rm if you want to remove the running container"
    exit 0
fi

if [[ $1 == "-rm" ]] || [[ $2 == "-rm" ]]; then
    docker stop $containerName
    docker rm $containerName
fi

if [[ $1 == "-b" ]] || [[ $2 == "-b" ]]; then
    docker build -t $imageTag .
fi

docker run --name="$containerName" --restart=always -d -p 3012:3012 $imageTag
