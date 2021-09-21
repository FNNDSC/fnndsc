# ChRIS API
[![Build Status](https://app.travis-ci.com/FNNDSC/fnndsc.svg?branch=master)](https://app.travis-ci.com/FNNDSC/fnndsc)

JavaScript 6 client for the ChRIS API.

## Installation

``` bash
npm i @fnndsc/chrisapi
```

## API Documentation

If you have a ChRIS server up and running (eg. as explained below) then you can test the API in your Javascript code.

For more information visit the [API documentation](https://fnndsc.github.io/fnndsc/chrisdoc/index.html)


## Development and testing

### ChRIS server preconditions

These preconditions are only necessary to be able to test the client against an actual
instance of a ChRIS server both during development and for the automated tests.

#### Install latest Docker and Docker Compose.

Currently tested platforms:
* ``Docker 18.06.0+``
* ``Docker Compose 1.27.0+``
* ``Ubuntu 18.04+ and MAC OS X 10.14+``

#### On a Linux machine make sure to add your computer user to the ``docker group``

#### Fire up the full set of ChRIS services:

Open a terminal and run the following commands in any working directory:

``` bash
$> git clone https://github.com/FNNDSC/ChRIS_ultron_backEnd.git
$> cd ChRIS_ultron_backEnd
$> ./make.sh -U -I -i
```

Check that all the services are up:

``` bash
$> docker ps -a
```

#### Create a test feed by making the following POST request:

Using curl:

```bash
curl -u cube:cube1234 -XPOST -H 'Content-Type: application/vnd.collection+json' -H 'Accept: application/vnd.collection+json' -d '{"template":{"data":[{"name":"dir","value":"cube/uploads/"}]}}' 'http://localhost:8000/api/v1/plugins/1/instances/'
```

Using [HTTPie](https://httpie.org/) REST API client:

```bash
http -a cube:cube1234 POST http://localhost:8000/api/v1/plugins/1/instances/ template:='{"data":[{"name":"dir","value":"cube/uploads/"}]}' Content-Type:application/vnd.collection+json Accept:application/vnd.collection+json
```

#### Update the feed's files by making the following GET request:

Using curl:

```bash
curl -u cube:cube1234 http://localhost:8000/api/v1/plugins/instances/1/
```

Using [HTTPie](https://httpie.org/) REST API client:

```bash
http -a cube:cube1234 http://localhost:8000/api/v1/plugins/instances/1/
```

Keep making this GET request until the ``"status"`` descriptor in the response becomes ``"finishedSuccessfully"``

#### Tear down the full set of ChRIS services:

You can later remove all the backend containers and release storage volumes with:

```bash
$ cd ChRIS_ultron_backEnd
$ ./unmake.sh
```

### JavaScript package manager prerequisite

* yarn

Open a terminal in the directory of this README file

### Commands

Install dependencies

``` bash
$> yarn install
```

Start tests in watch mode (used for developing)

``` bash
$> yarn start
```

Start test in single run mode (used by `Travis CI`)

``` bash
$> yarn test
```

Compile library to standalone bundle

``` bash
$> yarn build
```

Generate source code documentation

``` bash
$> yarn docs
```
