const gulp = require('gulp');

gulp.task('css', () => {
        return gulp.src('src/**/*.css').pipe(gulp.dest('dist'));
});

gulp.task('views', () => {
        return gulp.src('src/**/*.ejs').pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
        return gulp.src('src/**/*.webp').pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.parallel('css', 'views', 'images'));