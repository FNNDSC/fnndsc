
<p align="center"><img width="256px" src ="https://user-images.githubusercontent.com/214063/32576569-9cf89f9a-c4d7-11e7-9bd8-9fe838ed2915.png" /></p>

<p align="center">
Radiology Viewer by FNNDSC
</p>

<p align="center">
Project was initialized with the <a href="https://github.com/PolymerElements/polymer-starter-kit">Polymer Starter Kit v2</a>
</p>

## Update

``` bash

git pull origin master && \
rm -rf bower_components && \
bower update

```

## Develop

``` bash

polymer serve

```

## Build

es5-bundled preset includes:

* js-compile: es6 -> es5 (for older browser support)
* js-minify
* html-minify
* css-minify
* [more](https://www.polymer-project.org/1.0/docs/tools/polymer-cli)

``` bash

cd ~/src/gex && \
polymer build --verbose --preset es5-bundled && \
polymer serve --port 8060 --hostname 0.0.0.0 build/es5-bundled

```

## Docker container

### Build the app

See above

### Build the docker container

``` bash

docker build -t fnndsc/rav:dev .

```

### Deploy to dockerhub

``` bash

docker push fnndsc/rav:dev

```

### Save docker image to a file

``` bash

docker save fnndsc/rav:dev > rav.tar

```

### Load docker image from a file

``` bash

docker load < rav.tar

```

## Deploy

## Citations

## CUBE Setup

Start CUBE:

``` bash

docker-compose up

```

Startpfdcm with right port

``` bash

./pfdcm --forever --httpResponse --startlistener --setPACS \
'{
    "orthanc" : {
        "server_ip": "%HOST_IP",
        "aet": "CHIPS",
        "aet_listener": "CHIPS",
        "aec": "ORTHANC",
        "server_port": "4242"
    }
}'

```
