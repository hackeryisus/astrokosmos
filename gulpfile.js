var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
//Main paths
var config = {
  styles: {
    main:'./css/main.scss',
    watch: './css/**/*.scss',
    output: './'
  },
  images: {
  watch: ['./src/images/**/*'],
  output: './dist/img'
  }
}

//Create server
gulp.task('server', function(){
  gulp.src('./dist')
    .pipe(webserver({
      host:'0.0.0.0',
      port: 8080,
      livereload: true
    }));
});

//Watch changes in files
gulp.task('watch', function(){
  gulp.watch(config.images.watch, ['images']);
  gulp.watch(config.styles.watch, ['build:css']);
  //gulp.watch(config.html.watch, ['build'] );
});

//Concatenate javascripts
/*
gulp.task('build:js', function() {
  return gulp.src(config.scripts.watch)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.output));
})
*/
//Compile, add prefixes and minifycss
gulp.task('build:css', function(){
  return gulp.src(config.styles.main)
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(nano({
    discardComments: {removeAll: false}
  }))
  .pipe(rename('style.css'))
  .pipe(gulp.dest(config.styles.output));
});

//Add inline css to html and minify html
/*
gulp.task('build:html', function () {
  return gulp.src(config.html.main)
  .pipe(smoosher({
    base: './dist'
    }))
    .pipe(minifyhtml())
    .pipe(gulp.dest(config.html.output));
});*/

//Minify images
gulp.task('minimages', function() {
  return gulp.src(config.images.watch)
		.pipe(imagemin({
			progressive: true,
      optimizationLevel: 7,
      interlaced: true,
      multipass: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(config.images.output));
});

//Build task
gulp.task('build', ['build:css', 'minimages']);

gulp.task('default', ['server','build', 'watch']);
