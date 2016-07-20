'use strict'
var gulp = require('gulp'),
   tsc = require('gulp-typescript'),
   merge = require('merge2'),
   mocha = require('gulp-mocha'),
   sourcemaps = require('gulp-sourcemaps'),
   lint = require('gulp-tslint'),
   del = require('del'),
   copy = require('gulp-copy'),
   sequence = require('gulp-sequence'),
   istanbul = require('gulp-istanbul'),
   project = tsc.createProject('tsconfig.json');

//***************************************************************************
//* LINT
//***************************************************************************
gulp.task('src:lint', function(){
   return gulp.src([
       "src/typescript.list.ts"
   ])
   .pipe(lint({}))
   .pipe(lint.report('prose')); 
});

//***************************************************************************
//* BUILD
//***************************************************************************
gulp.task('src:build', function(){
   var tsResult = project.src()
       .pipe(sourcemaps.init())
       .pipe(tsc(project));
   
   return merge([
      tsResult.dts.pipe(gulp.dest('./src')),
      tsResult.js.pipe(sourcemaps.write('./')).pipe(gulp.dest('./src'))     
   ]);
   
});

gulp.task('build', sequence('clean', 'src:lint', 'src:build'));

//***************************************************************************
//* TEST
//***************************************************************************
gulp.task('test:build', function(){
    return gulp.src('./test/*.ts')
        .pipe(tsc({
           module: "commonjs"
        }))
        .pipe(gulp.dest('./test'));
});
gulp.task('test:coverage', function(){
    return gulp.src([
        'src/**/*.js'
    ])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});
gulp.task('test:mocha', function(){
   return gulp.src('./test/*.js', {read: false})
          .pipe(mocha({reporter: 'spec'}))
          .pipe(istanbul.writeReports({dir: './analysis/coverage'})); 
});
gulp.task('test', sequence('build', 'test:build', 'test:coverage', 'test:mocha'));

//***************************************************************************
//* PUBLISH
//***************************************************************************

gulp.task('clean:lib', function () {
    return del([
        "lib/*.*"
    ]);
});
gulp.task('clean:src', function () {
    return del([
        "src/*.js",
        "src/*.d.ts",
        "src/*.js.map",
        "test/*.js"
    ]);
});
gulp.task('clean', ['clean:lib', 'clean:src']);
gulp.task('copy', function(){
    return gulp.src('./src/*.*')
           .pipe(copy('./lib', {prefix: 2})); 
});
gulp.task('publish', sequence('build', 'copy', 'clean:src'));