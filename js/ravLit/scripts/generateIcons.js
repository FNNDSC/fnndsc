/* global require */
const exec = require('child_process').exec;

const targetImage =
    '../images/ra5.png';
const destination =
    '../images/manifest/';

const icons = [
  {
    name: 'icon-48x48.png',
    size: '48x48',
  },
  {
    name: 'icon-192x192.png',
    size: '192x192',
  },
  {
    name: 'icon-72x72.png',
    size: '72x72',
  },
  {
    name: 'icon-96x96.png',
    size: '96x96',
  },
  {
    name: 'icon-512x512.png',
    size: '512x512',
  },
  {
    name: 'icon-144x144.png',
    size: '144x144',
  },
  {
    name: 'favicon.ico',
    size: '16x16',
  },
];

/**
 * Log output
 * @param {*} error
 * @param {*} stdout
 * @param {*} stderr
 * @return {*}
 */
function puts(error, stdout, stderr) {
  return error + stdout + stderr;
}

for (let i=0; i<icons.length; i++) {
  exec('convert ' + targetImage +
         ' -verbose' +
         ' -background none' +
         ' -resize ' + icons[i].size +
         ' -gravity center' +
         ' -extent ' + icons[i].size +
         ' ' + destination + '/' + icons[i].name, puts);
}
