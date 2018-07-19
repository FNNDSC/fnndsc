
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

## Deploy

Important note, if you intend to serve the application from a directory, i.e. `fnndsc.com/rev`, make sure to adjust the `<base href="/rev/">` line 10 in index.html.

If you serve it from `fnndsc.com/rev`, the base would be `<base href="/">`.

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

## Add new data

1- Generate JSON description for the group of series
2- Add it in the lookup list
3- Add new directory on the file system