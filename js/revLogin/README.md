
<p align="center"><img width="256px" src ="https://user-images.githubusercontent.com/214063/32576569-9cf89f9a-c4d7-11e7-9bd8-9fe838ed2915.png" /></p>

<p align="center">
Radiology Viewer by FNNDSC
</p>

<p align="center">
Project was initialized with the <a href="https://github.com/PolymerElements/polymer-starter-kit">Polymer Starter Kit v2</a>
</p>

# Rev Login

## Introduction

Like the viewer you can install the login page with two different choice. 
The first one is follow the [development installation](https://github.com/Eogrim/fnndsc/tree/master/js/rev#development-version). Then, you can build the files of `revLogin` as explained [here](https://github.com/Eogrim/fnndsc/tree/master/js/rev#build). The only thing you have left to do is copy the files in `/var/www/html/rev/login/` of your install. 

The second maners is directly get the built files from [this repo](https://github.com/Eogrim/viewer). Then you just have to copy them in `/var/www/html/rev/login/`.

## Parameters

The login page redirect you from http://XXXXXX.XX/rev/login/ to http://XXXXXX.XX/rev/viewer/library-anon/
If for some reason you want to change it. Go to `revLogin/src/revl-app.html` and change this line:

```bash
var URL = window.location.href.split('/login')[0]+"/viewer/library-anon";
```
If you want to see how it work, you can check `revLogin/src/revl-login.html` 