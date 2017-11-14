'use strict';

var gulp = require('gulp');
var autoPrefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var imageMin = require('gulp-imagemin');
var rename = require('gulp-rename');
var sourceMaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var server = require('gulp-server-livereload');
var newer = require('gulp-newer');
var plumber = require('gulp-plumber');
var wait = require('gulp-wait');
var webpackStream = require('webpack-stream');
var webpack2 = require('webpack');

gulp.task('pages', function(){
	return gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('images', function(){
	return gulp.src('src/img/**/*.{jpg,png,gif,svg}')
		.pipe(newer('dist/img/**'))
		.pipe(imageMin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('sass', function () {
	return gulp.src('src/scss/main.scss')
		.pipe(sourceMaps.init({loadMaps: true}))
		.pipe(wait(1500))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoPrefixer('last 2 version', 'safari 5', 'ie 9'))
		.pipe(rename('styles.min.css'))
		.pipe(cleanCSS())
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {

	var options = {
		entry: {
			main: './src/js/main.js'
		},
        
		output: {
			publicPath: 'dist/',
			path: __dirname + '/dist',
			filename: '[name].min.js'
		},
		watch: true,
		devtool: 'cheap-module-inline-source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [{
						loader: 'babel-loader',
						options: { presets: ['env'] }
					}]
				}
			]
		}
	};

	return gulp.src('src/js/main.js')
		.pipe(plumber())
		.pipe(webpackStream(options, webpack2))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('webserver', function() {
	gulp.src('dist')
		.pipe(server({
			livereload: true,
			directoryListing: false,
			open: true,
			defaultFile: 'index.html'
		}));
});

gulp.task('default', function() {
	gulp.start('scripts', 'pages', 'sass', 'images', 'webserver');
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/*.html', ['pages']);
});