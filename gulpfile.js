// general
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var path = require('path');
var replace = require('gulp-replace');

// css
var minifyCSS = require('gulp-minify-css');
var modifyCssUrls = require('gulp-modify-css-urls');

// ejs
var ejs = require('gulp-ejs');

// svg
var svgSprite = require('gulp-svg-sprite');

// images
var imagemin = require('gulp-imagemin');
var imageminPngcrush = require('imagemin-pngcrush');

var reload = browserSync.reload;
var absolutePath = path.resolve(__dirname);

// path
var rootPath = 'design';
var destPath = 'src/style';
var filefolder = {
  'img': {
    'all': [rootPath + '/img/**/*'],
    'compress': [
      rootPath + '/img/**/*.png',
      rootPath + '/img/**/*.jpg',
      rootPath + '/img/**/*.gif',
      rootPath + '/img/**/*.svg',
      '!' + rootPath + '/img/png-sprite/**/*',
      '!' + rootPath + '/img/png-sprite-2x/**/*',
      '!' + rootPath + '/img/svg-sprite/**/*'
    ],
    'svg': {
      'sprite': rootPath + '/img/svg-sprite/**/*.svg',
      'temp': rootPath + '/svgSpriteTemp/'
    },
    'move': [
      rootPath + '/img/**/*.svg',
      rootPath + '/img/**/*.ico',
      '!' + rootPath + '/img/svg-sprite'
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
      rootPath + '/css/main.css'
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
        .pipe(gulp.dest(destPath + '/css'));
});


//gulp.src('**/*.svg', {cwd: 'path/to/assets'})
// svg sprite
// svg file please naming by Camel-Case  ex: ThisMySVGFile -> svgThisMySVGFile
gulp.task('svg-sprite-gen', function() {

  var config = {
    shape: {
      id: {
        separator: ''
      }
    },
    mode: {
      css: {
        dest: 'svgSpriteTemp',
        prefix: '.',
        sprite: 'svg-sprite.svg',
        dimensions: 'Dims',
        render: {
          //css: true,
          scss: {
            dest: '_svgSprite.scss'
          }
        },
        bust: true,
        example: false
      }
    }
  };

  return gulp.src(filefolder.img.svg.sprite)
      .pipe(plumber())
      .pipe(svgSprite(config))
      .pipe(gulp.dest(rootPath))
      .on('error', gutil.log);

});


gulp.task('svg-sprite-move', ['svg-sprite-gen'], function() {

  // 將舊的svg sprite檔案刪掉
  gulp.src(rootPath + '/img/*.svg')
      .pipe(plumber())
      .pipe(clean({
        force: true
      }))
      .on('error', gutil.log);

  // move svg sprite to design/img
  gulp.src(filefolder.img.svg.temp + '*.svg')
      .pipe(plumber())
      .pipe(gulp.dest(rootPath + '/img'))
      .on('error', gutil.log);


  // move svg scss to design/sass, and modify url path
  gulp.src(filefolder.img.svg.temp + '*.scss')
      .pipe(plumber())
      .pipe(replace(/(svg-sprite-.*\.svg)/g, '../img/$1'))
      .pipe(gulp.dest(rootPath + '/sass'))
      .on('error', gutil.log);


  // remove /svgSpriteTemp
  return gulp.src(filefolder.img.svg.temp)
      .pipe(plumber())
      .pipe(clean({
        force: true
      }))
      .on('error', gutil.log);

});



// 不一定要使用，webpack可設定將svg -> base64 encode
gulp.task('svg-sprite-watch', function() {
  gulp.watch(filefolder.img.svg.sprite, ['svg-sprite-move']);
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
            use: [imageminPngcrush()]
        }))
        .pipe(gulp.dest(destPath + '/img'))
        .on('error', gutil.log);

    /*
    return gulp.src(filefolder.img.move)
        .pipe(gulp.dest(destPath + '/img'))
        .on('error', gutil.log);
    */
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
gulp.task('design', ['browser-sync', 'ejs-watch', 'svg-sprite-watch']);


// 將design檔案轉到server資料夾內
gulp.task('dist', function(cb) {
    runSequence('clean', 'move-css');
});

// 將design檔案轉到server資料夾內, 加圖片, depoly時應該都要跑過一遍, 確保design的檔案都有同步到server
gulp.task('dist-img', function(cb) {
    runSequence('clean-all', 'minify-img', 'move-css');
});
