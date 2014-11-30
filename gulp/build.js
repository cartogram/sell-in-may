'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});

var paths = {
    theme : 'bikes-on-wheels',
    scripts : [

    ]

}

function handleError(err) {
    console.error(err.toString());
    this.emit('end');
}

gulp.task('styles', function () {
    return gulp.src('src/styles/**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({style: 'expanded', includePaths: ['src/bower_components/foundation/scss']}))
        .on('error', handleError)
        .pipe($.sourcemaps.write())
        .pipe($.autoprefixer('last 1 version'))
        .pipe($.csso())
        .pipe($.rename(function (path) {
            path.extname = ".css.liquid"
        }))
        .pipe(gulp.dest(paths.theme + '/assets'))
        .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src([
        'src/bower_components/lodash/dist/lodash.js',
        'src/bower_components/angular-waypoints/dist/angular-waypoints.all.js',
        'src/bower_components/jquery.lazyload/jquery.lazyload.js',
        'src/bower_components/swiper/src/idangerous.swiper.js',
        'src/bower_components/jquery-instagram/dist/instagram.js',
        'src/scripts/cartogram.background.js',
        'src/scripts/cartogram.dimensions.js',
        'src/scripts/cartogram.fill.js',
        'src/scripts/cartogram.events.js',
        'src/scripts/cartogram.toggle.js',
        'src/scripts/cartogram.scroll.js',
        'src/scripts/cartogram.loadWatch.js',
        'src/scripts/cart.js',
        'src/scripts/script.js'
        ])
        .pipe($.cached('scripts'))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.remember('scripts'))
        .pipe($.concat('scripts.js.liquid'))
        .pipe($.ngAnnotate())
        .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
        .pipe(gulp.dest('bikes-on-wheels/assets'))
        .pipe($.size());
});


gulp.task('images', function () {
    return gulp.src('src/images/*.{png,jpg,gif}')
    .pipe($.cache($.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
    })))
    .pipe($.flatten())
    .pipe(gulp.dest('bikes-on-wheels/assets'))
    .pipe($.size());
});

gulp.task('svgs', function () {
    return gulp.src('src/images/svgs/*.svg')
        .pipe($.svgSprites({
            mode: "symbols",
            svg: {
                symbols: "snippets/svg-symbols.liquid",
                defs: "snippets/svg-defs.liquid"
            },
            preview: false
        }))
        .pipe(gulp.dest("bikes-on-wheels"));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'bikes-on-wheels/assets'], { read: false }).pipe($.rimraf());
});

gulp.task('build', ['clean', 'scripts', 'styles', 'images', 'svgs']);
