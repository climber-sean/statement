const { src, dest, watch, series } = require('gulp');

const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass')),
    prefix = require('gulp-autoprefixer'),
    minify = require('gulp-clean-css'),
    babel = require('gulp-babel'),
    minifyjs = require('gulp-babel-minify'),
    imagemin = require('gulp-imagemin');

function compileSCSS() {
    return src('src/scss/index.scss')
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(minify())
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

function jsMin() {
    return src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minifyjs({
            mangle: {
                keepClassName: true
              }
        }))
        .pipe(dest('dist/js'))
}

function imageOptimise() {
    return src('src/img/*')
        .pipe(imagemin([
            imagemin.mozjpeg({
                quality: 80,
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 2
            })
        ]))
        .pipe(dest('dist/img'))
        .pipe(browserSync.stream());
}

function watchTask() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    watch('./*.html').on('change', browserSync.reload);
    watch('src/scss/*.scss', compileSCSS)
    watch('src/js/*.js', jsMin).on('change', browserSync.reload)
    watch('src/img/*.{jpg, png}', imageOptimise).on('change', browserSync.reload)
}

exports.default = series(
    compileSCSS,
    imageOptimise,
    jsMin,
    watchTask
)