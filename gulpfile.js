// NOTE: DEVELOPMENT: 'styles' process: TT commented out rename,
//    minifyCss, and it's destination to speed up running 'gulp'.
// NOTE: DEVELOPMENT: TT commented out the const require minifyCss.
// NOTE: DEVELOPMENT: 'scripts' process: TT commented out
//    pre-minified destination, rename, & uglify
// NOTE: DEVELOPMENT: TT commented out their declarations
//    (const require...)
// NOTE: DISTRIBUTION: Add in the commented out sections described
//    above and test..

// Loading external packages for use later
const annotate = require( 'gulp-ng-annotate' );
const autoprefixer = require( 'gulp-autoprefixer' );
const babel = require( 'gulp-babel' );
const browserSync = require( 'browser-sync' )
  .create();
const cache = require( 'gulp-cache' );
const concat = require( 'gulp-concat' );
const fs = require( 'fs' );
const gulp = require( 'gulp' );
const gulpSrc = require( 'gulp-src-ordered-globs' );
const gutil = require( 'gulp-util' );
const htmlify = require( 'gulp-angular-htmlify' );
const jshint = require( 'gulp-jshint' );
// const minifyCss = require( 'gulp-minify-css' );
// const noComments = require('gulp-strip-comments');
const noHtmlComments = require( 'gulp-remove-html-comments' );
const plumber = require( 'gulp-plumber' );
// const rename = require( 'gulp-rename' );
const sass = require( 'gulp-sass' );
const sourcemaps = require( 'gulp-sourcemaps' );
const tempCache = require( 'gulp-angular-templatecache' );
// const uglify = require( 'gulp-uglify' );


//################################
///---- Internal Functions ---####
//################################


// jshint - required by jshint.
var jshintVersion = '2.4.1';
var jshintOptions = fs.readFileSync( '.jshintrc' );

function makeHashKey( file ) {
  return [ file.contents.toString( 'utf8' ), jshintVersion, jshintOptions ].join( '' );
}

// gulp & templateCache - required path settings.
var clientApp = './dev/app/';
var config = {
  htmltemplates: clientApp + './**/*.html',
  templateCache: {
    file: 'templates.js',
    options: {
      module: 'app',
      root: 'app/',
      standAlone: false
    }
  },
  temp: './.tmp/'
};

// cache clearing
gulp.task( 'clear', function ( done ) {
  return cache.clearAll( done );
} );

// error handling
var onError = function ( err ) {
  gutil.beep();
  console.log( err );
  this.emit( 'end' );
};

// Browser definitions for autoprefixer
var AUTOPREFIXER_BROWSERS = [
  'last 3 versions',
  'ie >= 8',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

function prepareTemplates() {
  return gulp.src( './dev/app/**/*.html' )
    .pipe( tempCache(
      config.templateCache.file,
      config.templateCache.options
    ) )
    .pipe( htmlify() )
}


//################################
///-- Gulp Source Processes --####
//################################


// process html
gulp.task( 'html', function () {
  gulp.src( './dev/app/**/*.html' )
    .pipe( noHtmlComments() )
    .pipe( gulp.dest( './dist/html/' ) )
    .pipe( browserSync.stream() );
} );

// process index.html
gulp.task( 'index', function () {
  gulp.src( './dev/index.html' )
    .pipe( noHtmlComments() )
    .pipe( gulp.dest( './dist/' ) )
    .pipe( browserSync.stream() );
} );


// process styles files and return one css file.
gulp.task( 'styles', function () {
  return gulpSrc( [ './dev/styles/core.scss', './dev/styles/*.scss' ], {
      base: './dev'
    } )
    .pipe( plumber( {
      errorHandler: onError
    } ) )
    .pipe( sourcemaps.init( {
      debug: true
    } ) )
    .pipe( sass( {
      errLogToConsole: true
    } ) )
    .pipe( autoprefixer( AUTOPREFIXER_BROWSERS ) )
    .pipe( concat( 'bundle.css' ) )
    .pipe( sourcemaps.write( '../maps' ) )
    .pipe( gulp.dest( './dist/styles/' ) )

  // NOTE: DISTRIBUTION: Add in the commented out sections below and test..

  // .pipe( rename( {
  //   suffix: '.min'
  // } ) )
  // .pipe( minifyCss() )
  // .pipe( gulp.dest( './dist/styles/' ) )

  .pipe( browserSync.stream() );
} );

// process JS files and return the stream.
gulp.task( 'scripts', function () {
  return gulpSrc( [ './dev/app/*.js', './dev/app/**/*.js' ] )
    .pipe( plumber( {
      errorHandler: onError
    } ) )
    .pipe( jshint(), {
      key: makeHashKey,
      success: function ( jshintedFile ) {
        return jshintedFile.jshint.success;
      },
      value: function ( jshintedFile ) {
        return {
          jshint: jshintedFile.jshint
        };
      }
    } )
    .pipe( jshint.reporter( 'default' ) )
    // .pipe( sourcemaps.init( {
    //   loadMaps: true
    // } ) )
    .pipe( babel() )
    .pipe( concat( 'bundle.js' ) )

  // NOTE: DISTRIBUTION: Add in the commented out sections below and test..

  // .pipe( gulp.dest( './dist/scripts' ) )
  .pipe( annotate() )
    // .pipe( rename( {
    //   suffix: '.min'
    // } ) )
    // .pipe( uglify() )
    // .pipe( sourcemaps.write( './maps', {
    //   includeContent: true,
    //   sourceRoot: './dev/app/'
    // } ) )
    .pipe( gulp.dest( './dist/scripts' ) )
    .pipe( browserSync.stream() )
} );


//################################
///-- Gulp Adjunct Processes --###
//################################

// relocate dependencies
// NOTE: If we ever delete them from the dist folder, we can add them aback with this function.
gulp.task( 'depends', function () {
  return gulpSrc( [ './other-dependencies/**/*.{js, css, gzip, map, json, md, less, scss, sass}' ] )
    .pipe( plumber( {
      errorHandler: onError
    } ) )
    .pipe( gulp.dest( './dist/scripts' ) )
} )

// Optimize Images task
gulp.task( 'images', function () {
  return gulp.src( './dev/images/*.{gif,jpg,png,svg}' )
    .pipe( gulp.dest( './dist/images/' ) )
} );

// browser-sync
gulp.task( 'browser-sync', function () {
  // init starts the browser-sync server.
  browserSync.init( {
    server: {
      baseDir: './dist'
    }
  } );
} );

// browser-sync reload
gulp.task( 'reload', function () {
  browserSync.reload();
  gutil.log( 'reloading from task' );
} );

//################################
///-- Gulp Default Process --####
//################################


// default task
// typing gulp in the CLI (terminal) will run the 'default' task, declared below, which is a callback function that runs the tasks listed in the array, then any additional functions declared within.
// gulp.watch - watches the listed files for changes, then runes the array of functions listed within.
gulp.task( 'default', [ 'index', 'images', 'html', 'styles', 'scripts', 'browser-sync', 'reload' ], function () {
  gulp.watch( [ './dev/styles/*.{scss,css,sass,less,stylus}', './dev/styles/**/*.{scss,css,sass,less,stylus}' ], [ 'styles' ] )
  gulp.watch( [ './dev/app/*js', './dev/app/**/*.js' ], [ 'scripts' ] )
  gulp.watch( [ './dev/*.html', './dev/app/**/*.html' ], [ 'html', 'index' ] )
  // gulp.watch( 'index.html' )
  //   .on( 'change', browserSync.reload );
} );