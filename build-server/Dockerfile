# Base Image
FROM ubuntu:focal

# Updates all the packages inside the image
RUN apt-get update

# To do api calls we need curl cli tool
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs
RUN apt-get install git -y

WORKDIR /home/app

COPY main.sh main.sh

ENTRYPOINT ["/home/app/main.sh"]