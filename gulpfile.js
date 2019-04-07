let gulp = require('gulp');
let browserSync = require('browser-sync');

gulp.task('sync', function() {
  browserSync.init(['./website/*.css', './website/*.html', './website/*.js'], {
    server: {
      baseDir: "./website"
    }
  });
});
