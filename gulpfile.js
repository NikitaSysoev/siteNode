const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');

function scss() {
  return gulp
    .src('dev/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true,
      }),
    )
    .pipe(cssnano())
    .pipe(gulp.dest('public/stylesheets'));
}

function css() {
  return gulp
    .src('dev/css/**/*.css')
    .pipe(plumber())
    .pipe(
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true,
      }),
    )
    .pipe(cssnano())
    .pipe(gulp.dest('public/stylesheets'));
}

function js() {
  return (
    gulp
      .src(['dev/js/auth.js'])
      .pipe(concat('scripts.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('public/javascripts'))
  );
}

function server() {
  nodemon({
    script: 'app.js',
    watch: [
      'app.js',
      'gulpfile.js',
      'public/*',
      'public/*/**',
      'config.js',
      'models/*',
      'routes/*',
    ],
    ext: 'js',
  }).on('restart', () => {
    gulp.src('app.js');
  });
  gulp.watch('dev/scss/**/*.scss', scss);
  gulp.watch('dev/css/**/*.css', css);
  gulp.watch('dev/js/**/*.js', js);
}

module.exports.default = gulp.series(server, scss, css, js);
