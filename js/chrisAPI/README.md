# ChRIS API
[![Build Status](https://travis-ci.org/FNNDSC/fnndsc.svg?branch=master)](https://travis-ci.org/FNNDSC/fnndsc)

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

#### Install latest Docker and Docker Compose. Currently tested platforms
* ``Docker 17.04.0+``
* ``Docker Compose 1.10.0+``
* ``Ubuntu (16.04/17.04/17.10) and MAC OS X 10.11+``

#### Make sure to add your computer user to the ``docker group`` in your machine

#### Fire up the full set of ChRIS services:

Open a terminal and run the following commands in any working directory:

``` bash
$> git clone https://github.com/FNNDSC/ChRIS_ultron_backEnd.git
$> cd ChRIS_ultron_backEnd
$> ./docker-make-chris_dev.sh -U -I -i
```

Check that all the services are up:

``` bash
$> docker-compose ps
```

#### Create a test feed by making the following POST request:

Using curl:

```bash
curl -u cube:cube1234 -XPOST -H 'Content-Type: application/vnd.collection+json' -H 'Accept: application/vnd.collection+json' -d '{"template":{"data":[{"name":"dir","value":"./"}]}}' 'http://localhost:8000/api/v1/plugins/1/instances/'
```

Using [HTTPie](https://httpie.org/) REST API client:

```bash
http -a cube:cube1234 POST http://localhost:8000/api/v1/plugins/1/instances/ template:='{"data":[{"name":"dir","value":"./"}]}' Content-Type:application/vnd.collection+json Accept:application/vnd.collection+json
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
