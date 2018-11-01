
<p align="center"><img width="256px" src ="https://user-images.githubusercontent.com/214063/32576569-9cf89f9a-c4d7-11e7-9bd8-9fe838ed2915.png" /></p>

<p align="center">
Radiology Viewer by FNNDSC
</p>

<p align="center">
Project was initialized with the <a href="https://github.com/PolymerElements/polymer-starter-kit">Polymer Starter Kit v2</a>
</p>

# Installation

## Setup a LAMP instance

For either version of the viewer you want to use, you should have a LAMP instance on your computer

```bash
sudo apt install tasksel
```
Then, run 

```bash
sudo tasksel
```
and select the `LAMP` option.

## Deployment version

Install the build source 

```bash
cd /var/www/html/
mkdir -p rev/viewer
git clone build git repo !!!!!
```
To test your install, if you have a LAMP instance running correctly, you should be able to access the viewer without data on http://yourIPaddress/rev/viewer/

You can directly go to the "Data handling" part.

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
nvm install 10.7.0
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

#### Install moment.js

Install `moment.js`

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

#### Launch the viewer as a development version

YOU HAVE TO PROCESS YOUR DATAS FIRST

To launch the viewer go in `/var/www/html/rev/src/fnndsc/js/rev` and perform:
```bash
polymer serve --port XXXX --hostname YOUR.IP.ADDRESS.XXX
```
NOTE: Keep in mind the port should be the same as the one you defined in the pfdicom_rev command


## Data handling

For the two type of install you perform, you have to process your data

### Get your datas

Put your data in `/var/www/html/rev/src/fnndsc/js/rev`, the folder of your data should be call `library-anon`. 

NOTE: If you want to have a different name of folder you have to modify the `demoPrefix` in `src/rev-app.html`

### Tree structure

The tree stucture is `year > month > examples > series`

In consequence, your data should be names as `library-anon/XX-yr/XX-mo/XX-ex/SERIESNAME/XXXXXXXXXXXX.dcm`

If you are running a development version of the viewer the data should be store in: `/var/www/html/rev/src/fnndsc/js/rev/library-anon/...`

If you are running a deployment version of the viewer the data should be store in: `/var/www/html/rev/viewer/library-anon/...`

### Process your datas

To work, the viewer need somes JSON files. Thoses will be create by `pfdicom_rev`. 
Install it with: https://github.com/FNNDSC/pfdicom_rev

When everything is set just do this command in `.../pfdicom_rev/bin`:

```bash
./pfdicom_rev -I /var/www/html/rev/src/fnndsc/js/rev/library-anon/ -e dcm -O %inputDir -v 3 --printElapsedTime --server http://XXXXXXXX.XXX:XXXX
```
BE CAREFUL, you need to change the server in the command. 

As an example, for a development version a server name could be: http://centurion.tch.harvard.edu:8060

And for a deployment version: http://centurion.tch.harvard.edu/rev/viewer/

NOTE: If you want to use the --studyJSON parameters of pfdicom_rev, you should change this line in `src/rev-app.html` 
```bash
const testURL = `${this.demoPrefix}/${target}/description.json`
```

# Usage

To use the viewer you have to mode avaiable. 

## Mode 1 : Year Month Example

To use this mode, you can define an age telling it in year and month to see the scans corresponding from the database.

Example : http://centurion.tch.harvard.edu/rev/viewer/?year=00&month=00&example=01

## Mode 2 : PatientBirthDate ScanDate Example

This mode is use to have automatically an example corresponding to a patient birthdate and his scan date. It will display the closest example in term of age from the database. The format if YYYYMMDD.

Example : http://centurion.tch.harvard.edu/rev/viewer/?patientbirthdate=20160608&scandate=20180207&example=01

### NOTE 

For each mode you will have multiple example. Do not hesitate to change the example parameter. If you wish to see the list of the example and scan, you can just put 00 to the example parameter. This work in both mode.

Example : http://centurion.tch.harvard.edu/rev/viewer/?patientbirthdate=20160608&scandate=20180207&example=00


# Modification and building

If you want to upgrade the viewer, it's very likely that you will have to modify the `/src/rev-app.html`. Especially the javascript part. Almost all the change were made in this file. 

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

Your viewer should be avaiable on http://yourIPaddress/rev/viewer/

## Parameters

Here is the list of all the parameters you might want to use.

In index.html:

- `<base href='/'>` This parameter will be use to define the root of the viewer. 
  Develpoment value: `<base href='/'>`. 
  Deployment value: `<base href='/rev/viewer/'>`

In src/rev-app.html:

- `demoPrefix` This parameter is use to define the name of the file containing all the datas.
  Default : library-anon
- `description.json` It should follow the --studyJSON parameter of pfdicom-rev. Change the end of this line:
```bash
const testURL = `${this.demoPrefix}/${target}/description.json`
```