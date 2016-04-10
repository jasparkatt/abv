// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint'),
	browserSync = require('browser-sync');

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
            baseDir: "./abv"
        }
    });
});		