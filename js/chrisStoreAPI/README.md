# ChRIS Store API
[![Build Status](https://travis-ci.org/FNNDSC/fnndsc.svg?branch=master)](https://travis-ci.org/FNNDSC/fnndsc)

JavaScript6 client for the ChRIS Store API.

## Installation

``` bash
npm i @fnndsc/chrisstoreapi
```

## API Documentation

If you have a ChRIS store server up and running (eg. as explained below) then you can test the API in your Javascript code.

For more information visit the [API documentation](https://fnndsc.github.io/fnndsc/chrisstoredoc/index.html)


## Development and testing

### ChRIS Store server preconditions

These preconditions are only necessary to be able to test the client against an actual
instance of a ChRIS Store server both during development and for the automated tests.

#### Install latest Docker and Docker Compose. Currently tested platforms
* ``Docker 17.04.0+``
* ``Docker Compose 1.10.0+``
* ``Ubuntu 16.04+ and MAC OS X 10.11+``

#### On a Linux machine make sure to add your computer user to the ``docker`` group

#### Fire up the full set of ChRIS store services:

Open a terminal and run the following commands in any working directory:

``` bash
$> git clone https://github.com/FNNDSC/ChRIS_store.git
$> cd ChRIS_store
$> ./make.sh up
```

Check that all the services are up:

``` bash
$> docker-compose -f docker-compose_dev.yml ps
```

#### GET request to the list of plugin metas:

Using curl:

```bash
curl http://localhost:8010/api/v1/
```

Using [HTTPie](https://httpie.org/) REST API client:

```bash
http http://localhost:8010/api/v1/
```

#### Tear down the full set of ChRIS store services:

You can later remove all the backend containers and release storage volumes with:

```bash
$ cd ChRIS_store
$ ./make.sh down
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
