const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
// const sourcemaps = require('gulp-sourcemaps');

//scss to css
function style() {
    return gulp.src('theme/assets/scss/**.scss', {
        sourcemaps: true
    })
        .pipe(
            sass({ outputStyle: 'compressed' })
                .on('error', sass.logError)
        )
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('theme/assets/css', {sourcemaps: '.'}))
        .pipe(browserSync.reload({stream: true}));
}

// pug to html
function html() {
    return gulp.src('theme/assets/pug/pages/**.pug')
        .pipe(pug({pretty: true}))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('theme/pages'))
        .pipe(browserSync.reload({stream: true}));
}

// Watch function
function watch() {
    browserSync.init({
        proxy: 'http://localhost/chitchat_git/theme/pages/'
    });
    gulp.watch('theme/assets/scss/**/*.scss', style);
    gulp.watch('theme/assets/pug/**/**.pug', html);
    gulp.watch('theme/pages/**.html').on('change', browserSync.reload);
    gulp.watch('theme/assets/css/**.css').on('change', browserSync.reload);
}

exports.style = style;
exports.html = html;
exports.watch = watch;
const build = gulp.series(watch);
gulp.task('default', build, 'browser-sync');
