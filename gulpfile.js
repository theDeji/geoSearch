const gulp = require("gulp");
const uglify = require("gulp-uglify")
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const { parallel } = require("gulp");

//Copy HTML File
gulp.task('copyHTML', (done) =>{
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done();
})

//Minify and Concat JS Files
gulp.task('minify', (done) =>{
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    done();
})

//Compile SASS Files
gulp.task('sass', (done) =>{
    gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    done();
})

//Default Task
gulp.task('default', (done) =>{
    ['copyHTML', 'minify', 'sass']
    done();    
});

// Watch Task
gulp.task('watch', (done) =>{
    gulp.watch(['src/*.html', 'src/js/*.js', 'src/sass/*.scss'],
    parallel('copyHTML', 'minify', 'sass', 'default'));
    done();
});