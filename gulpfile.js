// Gulp.js configuration

// Include gulp and plugins
var
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    pkg = require('./package.json');

// file locations
var
    devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),

    source = 'source/',
    dest = 'build/',

    images = {
        in: source + 'img/*.*',
        out: dest + 'img/'
    };

// clean the build folder
gulp.task('clean', function () {
    'use strict';

    del([
        dest + '*'
    ]);
});

// show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

// manage images
gulp.task('images', function () {
    'use strict';

    // Con "gult.src" definimos el origen de la información que vamos a procesar.
    // Con el "pipe", redireccionamos el resultado del procesamiento al destino que
    // hayamos definido. En este caso, se hace una copia de las imágenes.
    return gulp.src(images.in)
               .pipe(newer(images.out))
               .pipe(imagemin())
               .pipe(gulp.dest(images.out));
});

// default task
gulp.task('default', function () {
    'use strict';

    console.log('Running Gulp');

    gulp.watch(images.in, ['images']);
});