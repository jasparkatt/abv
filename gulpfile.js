// load node modules/plugins
var gulp       = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var jsonminify  = require('gulp-jsonminify');
var jshint      = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var imagemin    = require('gulp-imagemin');

//process styles
gulp.task('styles', function() {
    return gulp.src('src/css/*.css')
       .pipe(concat('all.css'))
       .pipe(gulp.dest('dist'));
});

//process scripts
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('default'))
       .pipe(concat('all.js'))
       .pipe(uglify())
       .pipe(gulp.dest('dist'));
});

//process json...omitting for now..stupid Jason :)
//gulp.task('minify', function () {
 //    return gulp.src(['src/data/*.json'])
  //      .pipe(jsonminify())
        
 //      .pipe(gulp.dest('dist'));
//});

//process images
gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

//watching files -- runs task in second argument on change i.e. 'styles'

gulp.task('watch', function() {
   gulp.watch('src/styles/*.css', ['styles', browserSync.reload]);
   gulp.watch('src/scripts/*.js', ['scripts', browserSync.reload]);
   gulp.watch('src/images/*', ['images', browserSync.reload]);
   
});


  

// start server
gulp.task('browser-sync', function() {
    browserSync([ 'dist/all.css', 'dist/all.js', 'index.html'], {
        server: {
            baseDir: "./"
        }
    });
});	

// Default task to be run with `gulp`
gulp.task('default', ['styles', 'scripts', 'images', 'watch', 'browser-sync']);
    





