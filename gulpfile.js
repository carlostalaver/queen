var gulp = require('gulp');
var filter = require('gulp-filter');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var gls = require('gulp-live-server');
var libDir = './node_modules';
var distDir = './dist';
var srcDir = './src';

gulp.task('js-app-dist', function(done) {
    var appFiles = [
        srcDir+'/app/app.js'
    ];

    gulp.src(appFiles)
    .pipe(concat('queen-app.js'))
    .pipe(gulp.dest(distDir+'/scripts/'))
    .pipe(concat('queen-app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(distDir+'/scripts/'))
    .on('end', done)
});
gulp.task('js-lib-dist', function(done) {
    var libFiles = [libDir + '/angular/angular.min.js',
        libDir + '/angular-route/angular-route.min.js',
        libDir + '/angular-ui-bootstrap/ui-bootstrap.min.js'];

    gulp.src(libFiles)
        .pipe(concat('queen-lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(distDir+'/scripts/'))
        .on('end', done)
});

gulp.task('html-dist', function (done) {
    gulp.src([
        srcDir+'/**'
    ])
    .pipe(filter('**/*.html'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(distDir))
    .on('end', done)
});

gulp.task('css-app-dist', function(done) {
  	var libFiles = [
            srcDir + '/css/public-layout-one-column.css',
            srcDir + '/css/public-layout-two-columns.css'
        ];

  	gulp.src(libFiles)
  	.pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ basename : 'queen-app', extname: '.min.css' }))
    .pipe(gulp.dest(distDir+'/css/'))
    .on('end', done);
});

gulp.task('css-lib-dist', function(done) {
  	var libFiles = [
			libDir + '/bootstrap-css-only/css/bootstrap.min.css'
  		];

  	gulp.src(libFiles)
  	.pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(concat('queen-lib.min.css'))
    .pipe(gulp.dest(distDir+'/css/'))
    .on('end', done);
});

gulp.task('img-dist', function (done) {
    gulp.src([
        srcDir+'/img/**/*'
    ])
    .pipe(gulp.dest(distDir+'/img'))
    .on('end', done)
});

gulp.task('default', ['js-lib-dist', 'js-app-dist', 'html-dist', 'css-lib-dist', 'css-app-dist', 'img-dist']);