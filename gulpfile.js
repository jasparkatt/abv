// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint'),
	browserSync = require('browser-sync'),
    reload      = browserSync.reload;
    
// js hint task
gulp.task('jshint', function() {
	gulp.src('./src/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
		});


//browser sync server
gulp.task('browser-sync', function() {
    browserSync(['./src/**/*.css', './src/**/*.js', './src/**/*.html'], {
        server: {
            baseDir: "./"
        }
    });
});	


// Default task to be run with `gulp`
gulp.task('default', ['jshint', 'browser-sync'], function () {
    gulp.watch('../styles/*.css', function (file) {
        if (file.type === "changed") {
            reload(file.path);
        }
    });
    //watch for js change
    gulp.watch('../scripts/*.js', function() {
        gulp.run('jshint');
    });
});