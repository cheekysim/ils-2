const gulp = require('gulp');
const ts = require('gulp-typescript');
const rimraf = require('rimraf')
const tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
        return rimraf.rimraf('dist/**/*', { glob: true })
});

gulp.task('css', () => {
        return gulp.src('src/**/*.css').pipe(gulp.dest('dist'));
});

gulp.task('views', () => {
        return gulp.src('src/**/*.ejs').pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
        return gulp.src('src/**/*.webp').pipe(gulp.dest('dist'));
});

gulp.task("ts", function () {
        return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
      });

gulp.task('default', gulp.series('clean', gulp.parallel('ts', 'css', 'views', 'images')));