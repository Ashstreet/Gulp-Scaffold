'use strict'

const gulp = require('gulp'),
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
	babel = require('gulp-babel'),
	config = {
		watch: {
			scss: [
				'./app/public/sass/*.scss',
				'./app/public/sass/**/**/*.scss',
				'./app/public/components/**/**/*.scss'
			],
			js: [
				'./node_modules/jquery/dist/jquery.min.js',
				'./app/public/js/*.js',
				'./app/public/components/**/**/*.js'
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

gulp.task('sass', () => {
	gulp.src(config.watch.scss)
		.pipe(sourcemaps.init())
		.pipe(concat(config.concat.css))
		.pipe(sourcemaps.write(config.compiled.sourceMaps))
		.pipe(gulp.dest(config.compiled.css))
		.pipe(cssmin())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest(config.compiled.css))
		.pipe(notify('Sass task complete'));
});

gulp.task('javascript', () => {
	gulp.src(config.watch.js)
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat(config.concat.js))
		.pipe(gulp.dest(config.compiled.js))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify().on('error', util.log))
		.pipe(gulp.dest(config.compiled.js))
		.pipe(sourcemaps.write(config.compiled.sourceMaps))
		.pipe(notify('JS Task Complete'));
});

gulp.task('html-minify', () => {
	gulp.src(config.watch.html)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(config.compiled.html))
		.pipe(notify('HTML Minify Done'));
});

gulp.task('server', () => {
	nodemon({
		script: config.server.serverScript,
		ext: config.server.ext
	}).on('restart', () => {
		console.log('Server restarted')
	})
});

gulp.task('watch', () => {
	gulp.watch(config.watch.scss, ['sass']);
	gulp.watch(config.watch.js, ['javascript']);
	gulp.watch(config.watch.html, ['html-minify']);
});


gulp.task('default', ['watch', 'server', 'html-minify']);
