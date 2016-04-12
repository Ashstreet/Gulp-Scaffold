'use strict'

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	nodemon = require('gulp-nodemon'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify'),
	htmlmin = require('gulp-htmlmin'),
	uglify = require('gulp-uglify'),
	config = {
		watch: {
			scss: [
				'./app/public/sass/*.scss',
				'./node_modules/bootstrap/bootstrap.min.css'
			],
			js: [
				'./app/*.js',
				'./app/public/js/*.js',
				'./node_modules/jquery/dist/jquery.min.js'
			],
			html: [
				'./app/public/*.html'
			]
		},
		compiled: {
			'css': './app/dist/css',
			'cssMaps': './maps',
			'js': './app/dist/js',
			'jsMaps': './maps',
			'html': 'app/dist'
		},
		concat: {
			'css': 'main.min.css',
			'js': 'main.min.js'
		},
		server: {
			'serverScript': 'server.js',
			'ext': 'html js'
		}
	};

gulp.task('sass', function() {
	gulp.src(config.watch.scss)
		.pipe(sourcemaps.init())
		.pipe(concat(config.concat.css))
		.pipe(sourcemaps.write(config.compiled.cssMaps))
		.pipe(gulp.dest(config.compiled.css))
		.pipe(notify('Sass task complete'));
});

gulp.task('javascript', function() {
	gulp.src(config.watch.js)
		.pipe(sourcemaps.init())
		.pipe(concat(config.concat.js))
		.pipe(sourcemaps.write(config.compiled.jsMaps))
		.pipe(gulp.dest(config.compiled.js))
		.pipe(notify('JS Task Complete'));
});

gulp.task('html-minify', function() {
	gulp.src(config.watch.html)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(config.compiled.html))
		.pipe(notify('HTML Minify Done'));
});

gulp.task('uglify', function() {
	gulp.src(config.compiled.js)
		.pipe(uglify())
		.pipe(gulp.dest('app/dist'))
		.pipe(notify('Uglify Done'))
});

gulp.task('server', function() {
	nodemon({
		script: config.server.serverScript,
		ext: config.server.ext
	}).on('restart', function() {
		console.log('Server restarted')
	})
});

gulp.task('watch', function() {
	gulp.watch(config.watch.scss, ['sass']);
	gulp.watch(config.watch.js, ['javascript', 'uglify']);
	gulp.watch(config.watch.html, ['html-minify']);
});


gulp.task('default', ['watch', 'server', 'html-minify']);
