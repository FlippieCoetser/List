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
   project = tsc.createProject('tsconfig.json'),
   exec = require('child_process').exec;

// ***************************************************************************
// * CLEAN
// ***************************************************************************

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

// ***************************************************************************
// * BUILD
// ***************************************************************************

gulp.task('src:lint', function(){
   return gulp.src([
       "src/typescript.list.ts"
   ])
   .pipe(lint({}))
   .pipe(lint.report('prose')); 
});

gulp.task('src:build', function(){
   var tsResult = gulp.src('src/*.ts')
       .pipe(sourcemaps.init())
       .pipe(tsc(project));
   
   return merge([
      tsResult.dts.pipe(gulp.dest('./src')),
      tsResult.js.pipe(sourcemaps.write('./')).pipe(gulp.dest('./src'))     
   ]);  
});

gulp.task('build', sequence('clean', 'src:lint', 'src:build'));

// ***************************************************************************
// * TEST
// ***************************************************************************

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

// ***************************************************************************
// * ANALYSE
// ***************************************************************************

gulp.task('analyse:plato', function(){
    exec('plato -r -d ./analysis/complexity/report src', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stdout) {
            console.log(`${stdout}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
    })
});

gulp.task('analyse:complexity', function(){
    exec('cr --config .complexrc ./src', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stdout) {
            console.log(`${stdout}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
    })
});

gulp.task('analyse', sequence('analyse:plato', 'analyse:complexity'));

// ***************************************************************************
// * PUBLISH
// ***************************************************************************

gulp.task('copy', function(){
    return gulp.src(['./src/*.js','./src/*.d.ts','./src/*.js.map'])
           .pipe(copy('./lib', {prefix: 2})); 
});

gulp.task('publish', sequence('build', 'copy', 'clean:src'));