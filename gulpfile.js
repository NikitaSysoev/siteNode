const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const nodemon = require('nodemon');
const plumber = require('gulp-plumber');

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


function server(){
  nodemon({
    script: 'index',
    watch: ['index.js', 'app.js', 'gulpfile.js', 'public/*', 'public/*/**'],
    ext: 'js',
  }).on('restart', ()=>{
    gulp.src('index.js')
  });
  gulp.watch('dev/scss/**/*.scss', scss)
  gulp.watch('dev/css/**/*.css', css)
}

module.exports.default = gulp.series(server, scss, css)