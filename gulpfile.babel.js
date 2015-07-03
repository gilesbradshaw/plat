// generated on 2015-06-22 using generator-gulp-webapp 1.0.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

import nodemon from 'gulp-nodemon';
import  mocha from 'gulp-mocha';
import watch from 'gulp-watch';
import util from 'gulp-util';


const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  util.log('doing gulp styles......');
  return gulp.src('public/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .on('end', function(){
      util.log("wrote styles!!!!!!!!!!!!!!!!!!!!!!!!");
    })
    .pipe(reload({stream: true}));


});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  },
  globals: {
    assert: false,
    expect: false,
    should: false
  }
};

gulp.task('lint', lint('public/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'public', '.']});

  return gulp.src('public/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('public/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('public/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'public/*.*',
    '!public/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components',
        '/node_modules': 'node_modules',
        '/test': 'test'
      }
    }
  });

  gulp.watch([
    'public/*.html',
    'public/scripts/**/*.js',
    'public/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('public/styles/**/*.scss', ['styles']);
  gulp.watch('public/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'public/bower_components',
        '/node_modules': 'node_modules',
        '/public': 'public',
        '/test': 'test',
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('public/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('public/styles'));

  gulp.src('public/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});


//pasted from express project...

// Copy all static images
gulp.task('test', ()=> {
  gulp.src('./server-test/*.js')
    .pipe(mocha({
      ignoreLeaks: false,
      reporter: 'nyan'
    }));   
});

// Copy all static images
gulp.task('test:api', ()=> {
  gulp.src('./api-test/*.js')
    .pipe(mocha({
      ignoreLeaks: false,
      reporter: 'nyan'
    }));   
});


gulp.task('nodemon', ()=> {
  nodemon({ script: 'app.js', env: { 'NODE_ENV': 'development' }, nodeArgs: ['--debug=9999']})
    .on('restart')
});

// Rerun the task when a file changes

gulp.task('watch', ()=> {
    gulp.src(['*.js','routes/*.js', 'models/*.js', 'config/*.js'], { read: true })
        .pipe(watch({ emit: 'all' }));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['styles', 'fonts', 'test', 'nodemon', 'watch']);
