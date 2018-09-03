var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var childProc = require('child_process');

var node;

gulp.task('test:mocha', function () {
  return gulp.src('server/**/*.js', { read: false })
    .pipe(mocha({
      reporter: 'spec',
    }));
});

gulp.task('test:istanbul:pre', function () {
  return gulp.src('server/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test:istanbul', ['test:istanbul:pre'], function () {
  return gulp.src('server/**/*.js')
    .pipe(mocha({ reporter: 'spec' }))
    .pipe(istanbul.writeReports({
      dir: './build_artifacts',
      reporters: ['lcov', 'text', 'text-summary'],
      reportOpts: { dir: './build_artifacts' }
    }))
    .pipe(istanbul.enforceThresholds({ thresholds: { each: 95 } }));
});

gulp.task('serve', function () {
  if (node) {
    node.kill();
  }
  node = childProc.spawn('node', ['server.js'], { stdio: 'inherit' });
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected');
    }
  })
});

gulp.task('test', ['test:istanbul']);
gulp.task('default', ['serve'], function () {
  childProc.exec('npm start', {cwd: './client'});
  gulp.watch('server/*', ['serve']);
});

process.on('exit', function () {
  if (node) {
    node.kill();
  }
})
