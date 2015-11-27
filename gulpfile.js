// general
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

// ejs
var ejs = require('gulp-ejs');

// images
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');


var reload = browserSync.reload;

// path
var rootPath = 'design';
var destPath = 'static';
var filefolder = {
  'img': {
    'all': [rootPath + '/img/**/*'],
    'compress': [
      rootPath + '/img/**/*.png',
      rootPath + '/img/**/*.jpg',
      rootPath + '/img/**/*.gif',
      '!' + rootPath + '/img/icons/**/*',
      '!' + rootPath + '/img/icons-2x/**/*'
    ],
    'svg': '/img/svg/**/*.svg',
    'move': [
      rootPath + '/img/**/*.svg',
      rootPath + '/img/**/*.ico'
    ]
  },
  'ejs': {
    'all': [rootPath + '/ejs/**/*.ejs'],
    'removeHtmlEjs': rootPath + '/html/**/*.ejs'
  },
  'html': {
    'all': [rootPath + '/html/**/*.html'],
    'dest': rootPath + '/html'
  },
  'css': {
    'all': [rootPath + '/css/**/*.css'],
    'bundle': [
      rootPath + '/css/global/normalize.css',
      rootPath + '/css/bundle.css'
    ]
  },
  'sass': rootPath + '/sass/**/*.{sass, scss}'
};

// file state
var watchStatus = {
  'isAdded': function(file) {
    return file.event === 'added';
  },
  'isChanged': function(file) {
    return file.event == 'changed';
  },
  'isDeleted': function(file) {
    return file.event == 'deleted';
  },
  'isNotDeleted': function(file) {
    return file.event != 'deleted';
  }
};


// gulp tasks
gulp.task('browser-sync', function() {

  var syncAry = filefolder.img.all.concat(filefolder.css.all).concat(filefolder.html.all);

  gulp.watch(syncAry, reload);

  return browserSync({
    server: {
      baseDir: './',
      directory: true
    },
    debugInfo: false,
    open: false,
    browser: ["google chrome", "firefox"],
    injectChanges: true,
    notify: true,
    ghostMode: false
  });
});

gulp.task('ejs-watch', function() {
  gulp.watch(filefolder.ejs.all, function(e) {

    if (e.type !== 'deleted') {

      /*
      var configGlobal = JSON.parse(fs.readFileSync(filefolder.config.configGlobal));
      var configDev = JSON.parse(fs.readFileSync(filefolder.config.configDev));
      var configEjs = JSON.parse(fs.readFileSync(filefolder.config.ejsData));
      var config = extend(configEjs, configDev, configGlobal, {});
      */

      gulp.src(filefolder.ejs.all)
          .pipe(plumber())
          .pipe(ejs())
          .on('error', gutil.log)
          .pipe(gulp.dest(filefolder.html.dest))
          .pipe(reload({
            stream: true
          }));

      gulp.src(filefolder.ejs.removeHtmlEjs)
          .pipe(clean());

    }
  });
});


// css
// 合併global.css並壓縮複製所有/css到/dist/mobile/css
gulp.task('move-css', function() {

  var cssfile = filefolder.css.bundle;

  gulp.src(cssfile)
      .pipe(plumber())
      .pipe(concat('bundle.css'))
      .pipe(minifyCSS({
          keepBreaks: true
      }))
      .pipe(gulp.dest(destPath + '/css'));
});

// 壓縮圖片
gulp.task('minify-img', function() {

  gulp.src(filefolder.img.compress)
      .pipe(imagemin({
        optimizationLevel: 3,
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [pngcrush()]
      }))
      .pipe(gulp.dest(destPath + '/img'))
      .on('error', gutil.log);

  return gulp.src(filefolder.img.move)
      .pipe(gulp.dest(destPath + '/img'))
      .on('error', gutil.log);
});


// clean script
gulp.task('clean', function() {
  return gulp.src([destPath + '/css'], {
    read: false
  }).pipe(clean({
    force: true
  }));
});

gulp.task('clean-img', function() {
  return gulp.src([destPath + '/img'], {
    read: false
  }).pipe(clean({
    force: true
  }));
});
gulp.task('clean-all', ['clean', 'clean-img']);


// gulp task scripts
gulp.task('design', ['browser-sync', 'ejs-watch']);


// 將design檔案轉到server資料夾內
gulp.task('dist', function(cb) {
  runSequence('clean', 'move-css');
});

// 將design檔案轉到server資料夾內, 加圖片, depoly時應該都要跑過一遍, 確保design的檔案都有同步到server
gulp.task('dist-img', function(cb) {
  runSequence('clean-all', 'minify-img', 'move-css');
});
