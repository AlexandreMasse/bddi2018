'use strict';



/************************

DEPENDENCIES

***********************/

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const del = require('del');
const reload = browserSync.reload;
const autoprefixer = require('autoprefixer');
const replace = require('gulp-replace-path');
const path = require('path');
const tiny = require('gulp-tinypng-nokey');

const $ = gulpLoadPlugins();



/************************

BASIC SETUP

***********************/

// Assets in Source Directory (Private)
var dir = "src" ; // Main source folder
var sassDir = dir + '/sass';
var fontsDir = dir + '/fonts';
var imagesDir =  dir + '/images';
var jsDir =  dir + '/javascript';

// Enviroment variable. 'dev' by default, set to prod in prod-init task
var dev = true;



/************************

SCSS

***********************/

/** Compile SASS and minify**/
var processors = [
	autoprefixer({browsers: ['last 2 versions','> 2%','ie >= 9']})
];

gulp.task('styles', function(){
	return gulp.src( sassDir + '/styles.scss')
	.pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
	.pipe($.sourcemaps.init())
	.pipe($.sassGlob())
	.pipe($.if(dev, $.sass({ outputStyle: 'expanded' }).on('error', $.sass.logError)))
	.pipe($.if(!dev, $.sass({ outputStyle: 'compressed' }).on('error', $.sass.logError)))
	.pipe($.postcss(processors))
	.pipe($.sourcemaps.write())
	.pipe($.if(dev, gulp.dest('.tmp/styles')))
	.pipe($.if(!dev, gulp.dest('dist/assets/styles')))
	.pipe(reload({ stream: true }))
});



/************************

HTML

***********************/

/** Copy html files and change src**/
gulp.task('html', ['styles','scripts','images','fonts'], function(){
	return gulp.src('src/*.html')
	.pipe($.useref({searchPath: ['.tmp', 'src', '.']}))
	.pipe(gulp.dest('dist'))
});

gulp.task('srcChange', ['html'],function(){
	gulp.src(['dist/*.html'])
	
		// Specify rel="stylesheet" to avoid to change favicon href
		.pipe(replace('rel="stylesheet" href="', 'rel="stylesheet" href="assets/'))
		.pipe(replace('src="', 'src="assets/'))
				
		.pipe(gulp.dest('dist'))
		.pipe($.notify("Src and href successfully changed"))
});	



/************************

Javascript

***********************/

/** Compile JS and minify**/
gulp.task('scripts', function(){
	browserify(jsDir + '/app.js')
	.bundle()
	.on('error', function(err) { return $.notify().write(err); })
	.pipe(source('scripts.js'))
	
	// Minify javascript
	.pipe(buffer())
	.pipe($.if(!dev, $.uglify()))
	.pipe($.if(dev, gulp.dest('.tmp/javascript')))
	.pipe($.if(!dev, gulp.dest('dist/assets/javascript')))
	.pipe(reload({stream:true}));
});



/************************

Images

***********************/

/** Minify images **/
gulp.task('images', function(){
	return gulp.src(imagesDir + '/*')
	.pipe(tiny())
	.pipe(gulp.dest('dist/assets/images'));
});



/************************

Fonts

***********************/

/** Copy fonts **/
gulp.task('fonts', function(){
	gulp.src(fontsDir + '/*.{ttf,woff,eof,svg}')
	.pipe(gulp.dest('dist/assets/fonts'));
});



/************************

Watch

***********************/

/** Start Browser sync server **/
gulp.task('serve', ['styles', 'scripts', 'cleanProd'], function(){
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['.tmp', dir]
		}
	});
	
	gulp.watch([
		dir + '/*.php',
		dir + '/*.html',
		imagesDir + '**/*',
		'.tmp/fonts/**/*'
	]).on('change', reload);
	
	gulp.watch(sassDir + '/**/*.scss', ['styles']);
	gulp.watch(jsDir + '/**/*.js', ['scripts']);
	gulp.watch(fontsDir + '/**/*', ['fonts']);
});



/************************

Utils Tasks

***********************/

/*** Init build task ***/
gulp.task('buildInit', function(){
	dev = false;
});

/** Clean .tmp folder **/
gulp.task('cleanDev', function(){
	del(['.tmp']);
});

/** Clean dist folder **/
gulp.task('cleanProd', function(){
	del(['dist']);
});

/************************

End Tasks

***********************/

gulp.task('default',['serve']);

gulp.task('build', ['buildInit', 'html', 'srcChange', 'cleanDev'], function(){
	
	return gulp.src('dist/**/*').pipe($.notify("Build success!"))
	
});
