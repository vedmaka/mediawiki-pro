var gulp = require('gulp');
var sequence = require('gulp-sequence');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rigger = require('gulp-rigger');
var image = require('gulp-image');
var clean = require('gulp-clean');
var flatten = require('gulp-flatten');
//var watch = require('gulp-watch');

var paths = {
    src: {
        css: 'src/css/app.less',
        js: 'src/js/app.js',
        html: 'src/*.html',
        img: 'src/img/**',
        fonts: [
            'src/fonts/**/*.{ttf,woff,eof,eot,svg,woff2}',
            'bower_components/**/*.{ttf,woff,eot,eof,svg,woff2}'
        ],
        watcher: {
            css: 'src/css/**/*.{css,less}',
            js: 'src/js/**/*.js',
            html: 'src/**/*.html',
            img: 'src/img/**',
            fonts: 'src/fonts/**'
        }
    },
    dist: {
        css: 'dist/css/',
        js: 'dist/js/',
        html: 'dist/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    }
};

gulp.task('default', sequence('clean', 'fonts', 'css','js','html', 'image') );

gulp.task('css', function(){
    return gulp.src( paths.src.css )
        .pipe( less() )
        .pipe( sourcemaps.init() )
        .pipe( minifyCss() )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest( paths.dist.css ) );
});

gulp.task('js', function(){
    return gulp.src( paths.src.js )
        .pipe( rigger() )
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest( paths.dist.js ) );
});

gulp.task('html', function(){
    return gulp.src( paths.src.html )
        .pipe( rigger() )
        .pipe( gulp.dest( paths.dist.html ) );
});

gulp.task('image', function(){
    return gulp.src( paths.src.img )
        .pipe( image() )
        .pipe( gulp.dest( paths.dist.img ) );
});

gulp.task('clean', function(){
    return gulp.src( 'dist/', {read: false} )
        .pipe( clean() );
});

gulp.task('fonts', function(){
    return gulp.src( paths.src.fonts )
        .pipe( flatten() )
        .pipe( gulp.dest( paths.dist.fonts ) );
});

gulp.task('php', function(){
    return gulp.src( 'src/*.php' )
        .pipe( gulp.dest( 'dist/' ) );
});

gulp.task('watch', function(){
    gulp.watch(paths.src.watcher.css, ['css'] );
    gulp.watch(paths.src.watcher.js, ['js']);
    gulp.watch(paths.src.watcher.html, ['html']);
    gulp.watch(paths.src.watcher.fonts, ['fonts']);
    gulp.watch(paths.src.watcher.img, ['image']);
    gulp.watch('src/*.php', ['php']);
});