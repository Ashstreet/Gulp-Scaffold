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
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	ignore = require('gulp-ignore'),
	util = require('gulp-util'),
	config = {
		watch: {
			scss: [
				'./app/public/sass/*.scss'
			],
			js: [
				'./node_modules/jquery/dist/jquery.min.js',
				'./app/public/js/*.js'
			],
			html: [
				'./app/public/*.html'
			]
		},
		compiled: {
			'css': './app/dist/css',
			'sourceMaps': './maps',
			'js': './app/dist/js',
			'html': 'app/dist'
		},
		concat: {
			'css': 'main.css',
			'js': 'main.js'
		},
		server: {
			'serverScript': 'server.js',
			'ext': 'html js'
		}
	};

gulp.task('sass', function() {
	gulp.src(config.watch.scss)
		.pipe(concat(config.concat.css))
		.pipe(gulp.dest(config.compiled.css))
		.pipe(cssmin())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest(config.compiled.css))
		.pipe(notify('Sass task complete'));
});

gulp.task('javascript', function() {
	gulp.src(config.watch.js)
		.pipe(concat(config.concat.js))
		.pipe(gulp.dest(config.compiled.js))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify().on('error', util.log))
		.pipe(gulp.dest(config.compiled.js))
		.pipe(notify('JS Task Complete'));
});

gulp.task('html-minify', function() {
	gulp.src(config.watch.html)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(config.compiled.html))
		.pipe(notify('HTML Minify Done'));
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
	gulp.watch(config.watch.js, ['javascript']);
	gulp.watch(config.watch.html, ['html-minify']);
});


gulp.task('default', ['watch', 'server', 'html-minify']);
