var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

function handleError (err) {
  console.log(err);
  this.emit('end');
}

gulp.task('sass', function () {
  return gulp.src('public/css/style.scss')
    .pipe(sass())
    .on('error', handleError)
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
  browserSync.init({
    open: false,
    proxy: 'localhost:4001'
  });
});

gulp.task('watch', function () {
  gulp.watch('public/css/style.scss', ['sass']);
});

gulp.task('develop', ['watch', 'sass', 'browser-sync']);
gulp.task('build', ['sass']);
gulp.task('default', ['develop']);
