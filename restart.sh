#!/bin/bash
docker stop webvideo;docker rm webvideo
docker build -t webvideo .
docker run -itd --name webvideo --network host webvideo
