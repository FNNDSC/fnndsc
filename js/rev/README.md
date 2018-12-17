
<p align="center"><img width="256px" src ="https://user-images.githubusercontent.com/214063/32576569-9cf89f9a-c4d7-11e7-9bd8-9fe838ed2915.png" /></p>

<p align="center">
Radiology Viewer by FNNDSC
</p>

<p align="center">
Project was initialized with the <a href="https://github.com/PolymerElements/polymer-starter-kit">Polymer Starter Kit v2</a>
</p>

# Installation

## Preequisites:

### Setup a LAMP instance

For either version of the viewer you want to use, you should have a LAMP instance installed. In Ubuntu,

```bash
sudo apt install tasksel
```
Then, run 

```bash
sudo tasksel
```
and select the `LAMP` option.

## Type of installation

In most cases, the already compiled _Deployment version_ is sufficient. For development, however,  follow the instructions for the _Development version_.

## Deployment version

To install the _Deployment version_ use the already compiled source build available in the `rev` repo:

```bash
sudo bash
cd /var/www/html
mkdir rev
chmod 777 rev
cd rev
git clone https://github.com/FNNDSC/rev.git
```

To test, and assuming an already running LAMP instance, you should be able to access the viewer without data on http://yourIPaddress/rev/viewer/

Skip ahead to [_Data Handling_](https://github.com/FNNDSC/fnndsc/tree/master/js/rev#data-handling).

## Development version

### Get `npm/node`

One mechanism to install the latest `npm/node` on an Ubuntu machine is using `nvm`. See [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04).

Note that there seems to be ill-defined behaviour with the standard FNNDSC `.bashrc` env. Please replace the `nvm` supplied changes to `.bashrc` with:

```bash
export NVM_DIR="$HOME/.nvm"
if [[ -s "$NVM_DIR/nvm.sh" ]] ; then 
    cd $NVM_DIR ;  
    source "./nvm.sh"  # This loads nvm
    cd ~
fi
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
#### Select a version

Now, log out and login again. Simply run

```bash
nvm install 11.4.0 # Or whatever version of node you want
```

### Checkout and initialize the core source repo

Checkout the repo:

#### Create a dir for the source

```bash
sudo bash
cd /var/www/html
mkdir rev
chmod 777 rev
```

#### Checkout the source

```bash
cd /var/www/html/rev
mkdir src
cd src
git clone https://github.com/FNNDSC/fnndsc.git
```
#### Update

Install `bower` if necessary

```bash
npm install -g bower
```

And now do an update

```bash
cd /var/www/html/rev/src/fnndsc/js/rev
rm -rf bower_components && \
bower update
```

This might ask for user choice with regards to `moment.js`.

#### Install moment.js

Either stay with the choice above, or manually install `moment.js`

```bash
bower install moment --save
```
or

```bash
npm install moment --save
```

#### Install polymer-cli

Install `polymer-cli` 

```bash
npm install -g polymer-cli
```

#### Quick test of the viewer

For a quick test of the viewer, simply go to `/var/www/html/rev/src/fnndsc/js/rev`:

```bash
polymer serve --port XXXX --hostname YOUR.IP.ADDRESS.XXX
```

NOTE:
* In BCH deployments, in some Linux environments running Chrome, `localhost` and `127.0.0.1` may have proxy lookup issues. In those cases, use the actual machine IP.

* If you are planning on running a full viewer experience from a dev build, remember to specify the same IP/port in the call to `pfdicom_rev` while building the full backend.

## Data handling

Whether using a _Development_ or _Deployment_ build, the viewer needs a data tree containing both DICOMs (and optionally pre-processed JPG for the full viewer experience).

### Data location

Since there are some implicit assumptions in the actual code base of data folder locations and tree structure, adhere closely to the following.

First, the data tree should be located in `/var/www/html/rev/src/fnndsc/js/rev/library-anon`

NOTE: this location is hardcoded in the `demoPrefix` variable found in `src/rev-app.html`

### Tree structure

The tree structure is

```bash
<root>
   |
   +-- 00-yr
   |      |
   |      +-- 01-mo
   |      |     |
   |      |     +-- 01-ex
   |      |     +-- 02-ex
   |      +-- 02-mo
   |      |     |
   |      |     +-- 01-ex
   |      |     +-- 02-ex
   +      ... 
   +-- 01-yr
   |      |
   |      +-- 01-mo
   |      |     |
   |      |     +-- 01-ex
   |      |     +-- 02-ex
   |      +-- 02-mo
   |      |     |
   |      |     +-- 01-ex
   |      |     +-- 02-ex
  ...
````

In other words, `<YR>-yr/<MO>-mo/<EX>-ex` where `<YR>` and `<MO>` are integers (with leading zeroes where necessary) denoting patient age in year and month, and the `<EX>` trees are number examples of that give age specifier. Each example has a tree structure of 

```
<EX>-ex
    |
    +-- <SeriesName1>
    |         |
    |         +-- <DCMFILE_1>.dcm
    |         +-- <DCMFILE_2>.dcm
    |         +
    |        ...
    |         +-- <DCMFILE_n>.dcm
    +-- <SeriesName2>
    |         |
    |         +-- <DCMFILE_1>.dcm
    |         +-- <DCMFILE_2>.dcm
    |         +
    |        ...
    |         +-- <DCMFILE_n>.dcm
   ...
```
   
Note again the tree locations in the case of _Development_ vs _Deployment_:

Locations
* _Development_: `/var/www/html/rev/src/fnndsc/js/rev/library-anon`
* _Deployment_: `/var/www/html/rev/viewer/library-anon`


### Process your datas

To work, the viewer need some JSON files. Theses files will be created by `pfdicom_rev`. 
Install it with: https://github.com/FNNDSC/pfdicom_rev

When everything is set just do this command in `.../pfdicom_rev/bin`:

```bash
./pfdicom_rev -I /var/www/html/rev/src/fnndsc/js/rev/library-anon/ -e dcm -O %inputDir -v 3 --printElapsedTime --server http://XXXXXXXX.XXX:XXXX
```
BE CAREFUL, you need to change the server in the command. 

As an example, for a development version, a server name could be: http://centurion.tch.harvard.edu:8060

And for a deployment version: http://centurion.tch.harvard.edu/rev/viewer/

NOTE: If you want to use the --studyJSON parameters of pfdicom_rev, you should change this line in `src/rev-app.html` 
```bash
const testURL = `${this.demoPrefix}/${target}/description.json`
```

# Usage

To use the viewer, you have two modes available. 

## Mode 1 : Year Month Example

To use this mode, you can define an age telling it in years and months to see the scans corresponding from the database.

Example : http://centurion.tch.harvard.edu/rev/viewer/?year=00&month=00&example=01

## Mode 2 : PatientBirthDate ScanDate Example

This mode is used to have automatically an example corresponding to a patient birthdate and his scan date. It will display the closest example in term of age from the database. The format is YYYYMMDD.

Example : http://centurion.tch.harvard.edu/rev/viewer/?patientbirthdate=20160608&scandate=20180207&example=01

### NOTE 

For each mode you will have multiple examples. Do not hesitate to change the example parameter. If you wish to see the list of the example and scan, you can just put 00 to the example parameter. This work in both modes.

Example : http://centurion.tch.harvard.edu/rev/viewer/?patientbirthdate=20160608&scandate=20180207&example=00


# Modification and building

If you want to upgrade the viewer, it's very likely that you will have to modify the `/src/rev-app.html`. Especially the javascript part. Almost all the changes were made in this file. 

## Build

To build a development version to a deployment version: 

Change the `<base href='/'>` to `<base href='/rev/viewer/'>` in index.html. 

Then perform the build with es5-bundled preset.

es5-bundled preset includes:

* js-compile: es6 -> es5 (for older browser support)
* js-minify
* html-minify
* css-minify
* [more](https://www.polymer-project.org/1.0/docs/tools/polymer-cli)

```bash
cd /var/www/html/rev/src/fnndsc/js/rev
NODE_OPTIONS="--max-old-space-size=3072" polymer build --verbose --preset es5-bundled
```
Then, copy the file in `/var/www/html/rev/src/fnndsc/js/rev/build/es5-bundled/` to `/var/www/html/rev/viewer`

Your viewer should be available on http://yourIPaddress/rev/viewer/

## Parameters

Here is the list of all the parameters you might want to use.

In index.html:

- `<base href='/'>` This parameter will be used to define the root of the viewer. 
  Develpoment value: `<base href='/'>`. 
  Deployment value: `<base href='/rev/viewer/'>`

In src/rev-app.html:

- `demoPrefix` This parameter is used to define the name of the file containing all the data.
  Default : library-anon
- `description.json` It should follow the --studyJSON parameter of pfdicom-rev. Change the end of this line:
```bash
const testURL = `${this.demoPrefix}/${target}/description.json`
```
