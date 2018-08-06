var gulp = require('gulp'),//подключение модуля
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    del = require('del'),
    imageMin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache');



gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('clean', function() {
    return cache.clearAll();
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
    .pipe(cache(imageMin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        une: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/css/**', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

//таск для финалтной сборки
gulp.task('build', ['clean', 'img'], function() {
    //переносим все css
    var buildCss = gulp.src([
        'app/css/main.css',
        'app/css/normalize.css',
    ])
    .pipe(gulp.dest('dist/css'));
    //переносим все js
    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));
    //переносим все html
    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
    //переносим все img
    var buildHtml = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'));
});