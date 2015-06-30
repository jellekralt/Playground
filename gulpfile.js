/**
 * Gulpfile
 * ------------------------------------------------------
 * During development run:
 * $ gulp
 *
 * Build your project before commit:
 * $ gulp build
 */
var fs = require('fs');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');

gulp.task('watch', function () {
    livereload.listen();
});

gulp.task('serve', function () {

    nodemon({
        script: 'server.js',
        ext: 'js html tpl json'
    }).on('readable', function() {
        this.stdout.on('data', function(chunk) {
            if (/^listening/.test(chunk)) {
                livereload.reload();
            }
            process.stdout.write(chunk);
        });
    });

});

gulp.task('default', ['watch', 'serve']);