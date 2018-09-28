
<p align="center"><img width="256px" src ="https://user-images.githubusercontent.com/214063/32576569-9cf89f9a-c4d7-11e7-9bd8-9fe838ed2915.png" /></p>

<p align="center">
Radiology Viewer by FNNDSC
</p>

<p align="center">
Project was initialized with the <a href="https://github.com/PolymerElements/polymer-starter-kit">Polymer Starter Kit v2</a>
</p>

# Preconditions

## Get `npm/node`

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
### Select a version

Now, log out and login again. Simply run

```bash
nvm install 10.7.0
```
## Setup a LAMP instance

```bash
sudo apt install tasksel
```
Then, run 

```bash
sudo tasksel
```
and select the `LAMP` option.

## Checkout and initialize the core source repo

Checkout the repo:

### Create a dir for the source

```bash
sudo bash
cd /var/www/html
mkdir rev
chmod 777 rev
```

### Checkout the source

```bash
cd /var/www/html/rev
mkdir src
cd src
git clone https://github.com/FNNDSC/fnndsc.git
```
### Update

Install `bower` if necessary

```bash
npm install -g bower
```

And now do an update

``` bash
cd /var/www/html/rev/src/fnndsc/js/rev
git pull origin master && \
rm -rf bower_components && \
bower update
```

### Install polymer-cli

Install `polymer-cli` 

```bash
npm install -g polymer-cli
```

# Development and Modification

## Directory of files

Make sure `<base href="/">` is set in `index.html`.
It is use by the app as the base path to fetch files. If base is '/path/test', the application
tries to get its content from `<hostname>:<port>/path/test/`.

At development time, the application is served from `localhost:8081/` hence `<base href='/'>`.

You may also want to update `demoPrefix` in `rev-app.html` depending on where the data is located.

Then to launch the web server :

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

Same remarks as in previous section, regarding to `<base href='/rev/viewer/'>` and `demoPrefix`.

``` bash
polymer build --verbose --preset es5-bundled
polymer serve --port 8060 --hostname 0.0.0.0 build/es5-bundled
```

# Deploy

```bash
mkdir -p /var/www/html/rev/viewer
```

Now, make sure `<base href="/rev/viewer/">` is set in `index.html`.
At production time, the application is served from `<hostname>:<port>/rev/viewer/` hence `<base href='/rev/viewer/'>`

Once build copy content from `build/es5` to where we want to serve the app from. Typically it is `fnndsc.childrens.harvard.edu:/var/www/html/rev/viewer`.

You may have to add/link the directory containing the normative data there.

## Map URL to normative

in `src/rev-app.html`:

```javascript
pathFromRadstar(birthDate, scanDate) {
  return `${birthDate}/${scanDate}/`
}
pathFromHome(year, month, example) {
  return `${year}/${month}/${example}/`;
}
```

Then we use whatever is return by those function to construct a URL that target the `description.json`:

```javascript
 const testURL = `${this.demoPrefix}/${target}/description.json`
```

`demoPrefix` is the location of the directory containing the data, from the perspective of the client.

For instance, if the normative data is located at `fnndsc.childrens.harvard.edu:8000/rev/viewer` and `rev/viewer` contains the years/month/patient tree, demoPrefix should be `/rev/viewer/`.

## Add new data

### Tree structure
`year > month > patient / examples > series`

### Generate JSON description for the patient

To fetch data, a script generate a JSON file that discribe the series. This file is call `demo.json`

The script is located in : `js/rev/scripts/dcmpreview.py`

It requires pypx, pydicom, dcmtk, imagemagick

Either you run it for one serie :
```
 python3 dcmpreview.py -d year/month/example/series/
```

or for one study :
```
 python3 dcmpreview.py -d year/month/example/ --study
```

### Add it in the lookup list

We must allow `ReV` top fetch the JSON description for a given query.

https://github.com/FNNDSC/fnndsc/blob/master/js/rev/src/rev-app.html#L245

```
...
} else if (year && month && example) {
  target = this.pathFromRadstar(year, month, example);
}
...
```

We want `target` to be `years/month/patient` from the file system.

In the simplest case, we can just concatenate the properties, year 01, month 02 and patient 00 would give target === `01-yr/02-mo/ex-00`.

We may want to be smarter than that and find the closest match if none is available. For instance, following the previous example, if we only have data for `year 01, month 01 and patient 00` available, we want `pathFromRadstar` to return `01-yr/01-mo/ex-00`.

Logic has to be implemented in `pathFromRadstar` and https://github.com/FNNDSC/fnndsc/blob/master/js/rev/src/rev-app.html
 must keep track of all data available in the file system, possibly in a map.

### Add new directory on the file system

We must also provide `rev-app.html` the public location of the data, in order for the front-end to be able to fetch it.

That is the `demoPrefix`.
```
${this.demoPrefix}/${target}/description.json`
```

If the data is available at `fnndsc.childrens.harvard.edu/rev/viewer/yr-xx/...`, then demoPrefix would be `/rev/viewer`;

