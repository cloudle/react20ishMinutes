var gulp = require('gulp'),
	gutil = require('gutil'),
	chalk = require('chalk'),
	merge = require('utils-merge'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	nodemon = require('gulp-nodemon'),
	browserSync = require('browser-sync').create(),

	autoprefixer = require('gulp-autoprefixer'),
	stylus = require('gulp-stylus');

function mapError(err) {
	if (err.fileName) {
		gutil.log(chalk.red(err.name)
			+ ': '
			+ chalk.yellow(err.fileName.replace(__dirname, ''))
			+ ': '
			+ 'Line '
			+ chalk.magenta(err.lineNumber)
			+ ' & '
			+ 'Column '
			+ chalk.magenta(err.columnNumber || err.column)
			+ ': '
			+ chalk.blue(err.description))
	} else {
		gutil.log(chalk.red(err.name)
			+ ': '
			+ chalk.blue(err.messageFormatted || err.message))
	}

	this.emit('end');
}

gulp.task('bundle-styles', function () {
	gulp.src('./src/main.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.on('error', mapError)
		.pipe(autoprefixer({}))
		.pipe(rename("bundle.css"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./www'))
		.pipe(browserSync.stream());
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		port: 2015,
		proxy: "http://localhost:7015",
		files: ["./www/index.html"],
		open: false
	});

	gulp.watch("./src/**/*.styl", ['bundle-styles']);
});

var nodemonIgnores = [
	'src/**/*',
	'node_modules/**/*'
];

gulp.task('nodemon', function (callback) {
	var started = false;
	nodemon({script: 'server.js', ignore: nodemonIgnores}).on('start', function () {
		if (!started) { callback(); started = true; }
	});
});

gulp.task('default', ['bundle-styles', 'browser-sync']);