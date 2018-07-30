const path = require('path');
const fs = require('fs');
const imagemin = require('imagemin');

const PLUGIN_NAME = 'imagemin';
const ALLOW_COMPREESION_PRESENT_DIFF = 0.5;
const defaultPlugins = ['gifsicle', 'jpegtran', 'optipng'];

const ROOT_PATH = 'design/img';
const FILTER = /.*\.(jpg|jpeg|png|gif)$/;
const compressedImgAry = [];
let allFiles = [];
let stopCI = false;

const loadPlugin = (plugin, args) => {
  try {
    return require(`imagemin-${plugin}`).apply(null, args);
  } catch (err) {
    console.log(`${ROOT_PATH}: Couldn't load default plugin "${plugin}"`);
  }
};

const getDefaultPlugins = () =>
  defaultPlugins.reduce((plugins, plugin) => {
    const instance = loadPlugin(plugin);

    if (!instance) {
      return plugins;
    }

    return plugins.concat(instance);
  }, []);


const plugins = getDefaultPlugins();

function fromDir(startPath, filter) {

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  const files = fs.readdirSync(startPath);
  const imgFiles = files.filter(file => {
    return FILTER.test(file);
  }).map(file => {
    return path.join(startPath, file);
  });

  allFiles = allFiles.concat(imgFiles);

  for (let i = 0; i < files.length; i += 1) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      fromDir(filename, filter); // recurse
    }
  }
}

fromDir('design/img');

for (let i = 0; i < allFiles.length; i += 1) {
  const filePath = allFiles[i];
  const file = fs.readFileSync(filePath);


  compressedImgAry.push(imagemin.buffer(file, { plugins }));
}

Promise.all(compressedImgAry).then((data) => {

  for (let i = 0; i < data.length; i += 1) {
    const filePath = allFiles[i];
    const file = fs.readFileSync(filePath);

    const originalSize = file.length;
    const optimizedSize = data[i].length;
    const originalSizeKb = originalSize / 1024;
    const saved = originalSize - optimizedSize;
    const percent = originalSize > 0 ? (saved / originalSize) * 100 : 0;

    if (percent > ALLOW_COMPREESION_PRESENT_DIFF && originalSize > 2048) {
      console.log(`${filePath} ${originalSizeKb.toFixed(2)} test compression rate is: ${percent.toFixed(2)}%, it should be compression first`);
      stopCI = true;
    }
  }

  if (stopCI) {
    console.log('stop CI process!');
    process.exit(1);
  }
}).catch(err => {
  setImmediate(cb, new PluginError(PLUGIN_NAME, err, { fileName: file.path }));
});
