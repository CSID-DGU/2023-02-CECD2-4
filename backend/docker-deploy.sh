#!/bin/sh

docker build -t blaxsior/api-server -f ./server/Dockerfile ./server'
docker push blaxsior/api-server