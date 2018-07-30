require("babel-core/register");

var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var flatten = require('gulp-flatten');
var replace = require('gulp-replace');

var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var filter = require('gulp-filter');
var concat = require('gulp-concat');

// ejs
var ejs = require('gulp-ejs');
var htmlmin = require('gulp-htmlmin');
var removeEmptyRegex = />\s+</g;
var removeArrowEmptyBegin = />\s/g;
var removeArrowEmptyEnd = /\s</g;

// postcss
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss'); // like sass, have nested, mixin, extend
var lost = require('lost'); // grid system
var assets = require('postcss-assets'); // image-size, inline file
var at2x = require('postcss-at2x');
var comments = require('postcss-discard-comments');
var stripInlineComments = require('postcss-strip-inline-comments');
var postscss = require('postcss-scss');
var postcssCalc = require('postcss-calc');

// reload
var reload = browserSync.reload;



// webpack
var webpack = require('webpack');
var defaultServerPort = 3000;
var build = require('./build.settings');
var webpackConfig;
var outputPath = './dist';

// webpack dev-server new
var webpackServe = require('webpack-serve');
var history = require('connect-history-api-fallback');
var convert = require('koa-connect');

// webpack dev-server old for IE & Edge
var webpackDevServer = require('webpack-dev-server');


// path
var rootPath = path.resolve(__dirname, 'design');
var destPath = path.resolve(__dirname, 'src/style');

var filefolder = {
  img: {
    all: [rootPath + '/img/**/*'],
    compress: [
      rootPath + '/img/**/*.png',
      rootPath + '/img/**/*.jpg',
      rootPath + '/img/**/*.gif',
      rootPath + '/img/**/*.svg',
      '!' + rootPath + '/img/png-sprite/**/*',
      '!' + rootPath + '/img/png-sprite-2x/**/*',
      '!' + rootPath + '/img/svg-sprite/**/*',
    ],
    svg: {
      sprite: rootPath + '/img/svg-sprite/**/*.svg',
      temp: rootPath + '/svgSpriteTemp/',
    },
    move: [
      rootPath + '/img/**/*.svg',
      rootPath + '/img/**/*.ico',
      '!' + rootPath + '/img/svg-sprite',
    ],
  },
  ejs: {
    all: [rootPath + '/ejs/**/*.html'],
    removeHtmlEjs: rootPath + '/html/**/*.html',
  },
  html: {
    all: [rootPath + '/html/**/*.html'],
    dest: rootPath + '/html',
  },
  js: {
    all: [rootPath + '/js/**/*.js'],
  },
  css: {
    all: [rootPath + '/css/**/*.css'],
    move: [
      rootPath + '/css/globals/normalize.css',
    ],
    bundle: [
      rootPath + '/css/main.css',
    ],
  },
  postcss: rootPath + '/postcss/**/*.css',
  font: rootPath + '/font/**/*',
  fontIcon: rootPath + '/iconDemo/fonts/*.woff',
};

// file state
var watchStatus = {
  isAdded: function (file) {
    return file.event === 'added';
  },
  isChanged: function (file) {
    return file.event === 'changed';
  },
  isDeleted: function (file) {
    return file.event === 'deleted';
  },
  isNotDeleted: function (file) {
    return file.event !== 'deleted';
  },
};

var hostIP = build.getHostIP();

function startDevServer(port) {
  var config = require(build.getWebpackConfig());
  var compiler = webpack(config);


  var ProgressPlugin = require('webpack/lib/ProgressPlugin');
  compiler.apply(new ProgressPlugin(function (percentage, msg) {
    process.stdout.write((percentage * 100).toFixed(0) + '% ' + msg + "\r");
  }));

  webpackServe({
    compiler,
    content: 'dist',
    add: (app) => {
      // see example: https://github.com/webpack-contrib/webpack-serve/blob/master/docs/addons/history-fallback.config.js
      const historyOptions = {
        disableDotRule: false,
      };

      app.use(convert(history(historyOptions)));
    },
    host: hostIP,
    hot: true,
    quiet: false,
    open: true,
    port: defaultServerPort,
  });
}

function startOldDevServer(port) {
  var open = require('open');
  var ProgressPlugin = require('webpack/lib/ProgressPlugin');
  var config = require(build.getWebpackConfig());

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.entry.bundle = config.entry.bundle.slice(0, 1);
  config.entry.bundle.push(`webpack-dev-server/client?http://${hostIP}:${port}/`, 'webpack/hot/dev-server');

  var compiler = webpack(config);
  compiler.apply(new ProgressPlugin(function (percentage, msg) {
    process.stdout.write((percentage * 100).toFixed(0) + '% ' + msg + "\r");
  }));


  var server = new webpackDevServer(compiler, {
    contentBase: 'dist',
    disableHostCheck: true,
    hot: true,
    stats: {
      colors: true,
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    historyApiFallback: {
      disableDotRule: true,
    },
  });


  var openBrowser = function () {
    var port = this.address().port;

    console.log("Server is listening on port " + this.address().port);
    open(`http://${hostIP}:${port}`);
  }


  server.listeningApp.on('error', function (e) {
    if (e.code === 'EADDRINUSE') {
      startDevServer(e.port + 1);
    }
  });

  server.listeningApp.on('listening', openBrowser);
  server.listen(port);
}

gulp.task('browser-sync', function () {

  var syncAry = filefolder.img.all.concat(filefolder.css.all)
    .concat(filefolder.html.all)
    .concat(filefolder.js.all);

  gulp.watch(syncAry, reload);

  return browserSync({
    server: {
      baseDir: './',
      directory: true,
    },
    port: 4000,
    debugInfo: false,
    open: false,
    browser: ['google chrome', 'firefox'],
    injectChanges: true,
    notify: true,
    ghostMode: false,
  });
});

// ejs
gulp.task('ejs', function () {
  gulp.src(filefolder.ejs.all)
    .pipe(plumber())
    .pipe(filter(function (file) {
      return !/_.*\.html/.test(file.path);
    }))
    .pipe(ejs({}, {}, {
      ext: '.html',
    }))
    .on('error', gutil.log)
    .pipe(htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(replace(removeEmptyRegex, '><'))
    .pipe(replace(removeArrowEmptyBegin, '>'))
    .pipe(replace(removeArrowEmptyEnd, '<'))
    .pipe(gulp.dest(filefolder.html.dest))
    .pipe(reload({
      stream: true,
    }));

  return gulp.src(filefolder.ejs.removeHtmlEjs)
    .pipe(filter(function (file) {
      return /_.*\.html/.test(file.path);
    }))
    .pipe(clean());
});


gulp.task('ejs-watch', ['ejs', 'move-font-icon'], function () {
  return watch(filefolder.ejs.all, function (e) {
    gulp.run(['ejs']);
  });
});


// postcss
gulp.task('postcss', function () {
  return gulp.src(filefolder.postcss)
    .pipe(plumber())
    .pipe(filter(function (file) {
      return !/\/(_|__).*\.css$/.test(file.path);
    }))
    .pipe(postcss([
      precss,
      postcssCalc(),
      lost(),
      assets({
        basePath: 'design',
        relativeTo: 'css',
        loadPaths: ['img/'],
      }),
      at2x({
        identifier: '_2x',
      }),
      autoprefixer({
        browsers: [
          '> 2%',
          'last 2 versions',
          'ie >= 10',
        ],
      }),
      comments(),
      stripInlineComments(),
    ], { syntax: postscss }))
    .pipe(gulp.dest(rootPath + '/css'));
});

gulp.task('postcss-watch', ['postcss'], function () {
  return watch(filefolder.postcss, function (e) {
    gulp.run(['postcss']);
  });
});

gulp.task('postcss-watch-move', function (cb) {
  watch(filefolder.postcss, function (e) {
    gulp.run(['move-css']);
  });

  cb();
});

gulp.task('move-css', ['postcss'], function () {
  var moveFiles = filefolder.css.move;
  var bundleFiles = filefolder.css.bundle;

  gulp.src(moveFiles)
    .pipe(plumber())
    .pipe(gulp.dest(destPath + '/css'));

  return gulp.src(bundleFiles)
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(destPath + '/css'));

});

// fonts
gulp.task('move-font', ['move-font-icon'], function () {
  return gulp.src(filefolder.font)
    .pipe(plumber())
    .pipe(gulp.dest(destPath + '/font'));
});

gulp.task('move-font-icon', function () {
  return gulp.src(filefolder.fontIcon)
    .pipe(plumber())
    .pipe(gulp.dest(rootPath + '/font'));
});

// move images
gulp.task('move-img', function () {
  return gulp.src(filefolder.img.all)
    .pipe(gulp.dest(destPath + '/img'))
    .on('error', gutil.log);
});


// clean style
gulp.task('clean-style', function () {
  return gulp.src([destPath + '/css', destPath + '/font'], {
    read: false,
  }).pipe(clean({
    force: true,
  }));
});

gulp.task('clean-style-img', function (cb) {
  return gulp.src([destPath + '/img'], {
    read: false,
  }).pipe(clean({
    force: true,
  }));
});

gulp.task('clean-style-all', ['clean-style', 'clean-style-img']);

gulp.task('serve:local', ['clean', 'moveStaticFile', 'postcss-watch-move'], function () {
  startDevServer(defaultServerPort);
});

gulp.task('serve:local-ie', ['clean', 'moveStaticFile', 'postcss-watch-move'], function () {
  startOldDevServer(defaultServerPort);
});


// style gulp scripts
gulp.task('design', ['browser-sync', 'ejs-watch', 'postcss-watch']);

// 將 design 檔案轉到 src/style 資料夾內
gulp.task('dist', function (cb) {
  runSequence('clean-style', 'move-css', 'move-font', cb);
});

// 將 design 檔案轉到 src/style 資料夾內, 加圖片, depoly 時應該都要跑過一遍, 確保 design 的檔案都有同步到 src/
gulp.task('dist-img', function (cb) {
  runSequence('clean-style-all', 'move-img', 'move-css', 'move-font', cb);
});


// js gulp scripts
gulp.task('moveStaticFile', ['dist-img'], function () {
  return gulp.src([
    './static/*.*',
    '!./static/index.tpl',
  ])
  .pipe(gulp.dest(outputPath));
});

gulp.task('webpack', ['moveStaticFile'], function (callback) {
  webpackConfig = require(build.getWebpackConfig());

  webpack(webpackConfig, function (err) {
    if (err) {
      console.log(err);
      throw new Error("Webpack build failed: " + err);
    }
    callback();
  });
});

gulp.task('clean', function (cb) {
  rimraf.sync(outputPath);
  cb();
});

gulp.task('build', function (cb) {
  runSequence('clean', 'webpack', cb);
});
