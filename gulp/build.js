'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var theme = 'sell-in-may',
    dist = theme + '/assets',
    source = 'src',
    bower = source + '/bower_components',
    scripts = [
        bower + '/lodash/dist/lodash.js',
        bower + '/angular-waypoints/dist/angular-waypoints.all.js',
        bower + '/jquery.lazyload/jquery.lazyload.js',
        bower + '/swiper/idangerous.swiper.js',
        source + '/scripts/cartogram.background.js',
        source + '/scripts/cartogram.dimensions.js',
        source + '/scripts/cartogram.fill.js',
        source + '/scripts/cartogram.events.js',
        source + '/scripts/cartogram.toggle.js',
        source + '/scripts/cartogram.scroll.js',
        source + '/scripts/cartogram.loadWatch.js',
        source + '/scripts/cart.js',
        source + '/scripts/script.js'
    ];

function handleError(err) {
    console.error(err.toString());
    this.emit('end');
}

gulp.task('styles', function () {
    return gulp.src(source + '/styles/**/*.scss')
        .pipe($.sass({style: 'expanded', includePaths: [bower + '/foundation/scss']}))
        .on('error', function handleError(err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe($.autoprefixer('last 1 version'))
        .pipe($.csso())
        .pipe($.rename(function (path) {
            path.extname = ".css.liquid"
        }))
        .pipe(gulp.dest(dist))
        .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src(scripts)
        .pipe($.cached('scripts'))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.remember('scripts'))
        .pipe($.concat('scripts.js.liquid'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(gulp.dest(dist))
        .pipe($.size());
});


gulp.task('images', function () {
    return gulp.src(source + '/images/*.{png,jpg,gif}')
    .pipe($.cache($.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
    })))
    .pipe($.flatten())
    .pipe(gulp.dest(dist))
    .pipe($.size());
});

gulp.task('svgs', function () {
    return gulp.src(source + '/images/svgs/*.svg')
        .pipe($.svgSprites({
            mode: "symbols",
            svg: {
                symbols: "snippets/svg-symbols.liquid",
                defs: "snippets/svg-defs.liquid"
            },
            preview: false
        }))
        .pipe(gulp.dest(theme));
});


gulp.task('fonts', function () {
    return gulp.src(source + '/fonts/**/*.{eot,svg,ttf,woff}')
    .pipe($.flatten())
    .pipe(gulp.dest(dist))
    .pipe($.size());
});


gulp.task('clean', function (done) {
    $.del([dist, '.tmp/'], done);
});

gulp.task('build', ['clean', 'scripts', 'styles', 'images', 'svgs', 'fonts']);
