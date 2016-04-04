var gulp            = require('gulp');
var gulpif          = require('gulp-if');
var yargs           = require('yargs');
var autoprefixer    = require('gulp-autoprefixer');
var babel           = require('gulp-babel');
var include         = require('gulp-include');
var uglify          = require('gulp-uglify');
var sass            = require('gulp-sass');
var cssnano         = require('gulp-cssnano');
var sourcemaps      = require('gulp-sourcemaps');
var imagemin        = require('gulp-imagemin');
var watch           = require('gulp-watch');
var plumber         = require('gulp-plumber');
var twig            = require('gulp-twig');
var data            = require('gulp-data');
var prettify        = require('gulp-prettify');
var rimraf          = require('rimraf');
var runSequence     = require('run-sequence');
var browserSync     = require('browser-sync').create();
var reload          = browserSync.reload;



// SETUP
// ---------------------------------------------------------------------

const PRODUCTION = !!(yargs.argv.production);


// Set bower paths
var sassIncludePaths = [
    './src/scss/partials',
    './src/assets/bower_components/foundation-sites/scss',
];

// Set source paths
var src = {
    path: './src/',
    assetsDir: './src/assets/',
    scripts: './src/assets/js/**/*.js',
    images: 'src/assets/img/**/*', //gulp will not detect new images if using absolute path. Ex. "./src/img/**"
    sass: './src/assets/scss/**/*.scss',
    fonts: '.src/assets/fonts/**/*',
    templates: './src/templates/*.html'
}

// Set distribution paths
var dist = {
    path: './dist/',
    htmlDir: './dist/html/',
    assetsDir: './dist/html/assets',
    scriptsDir: './dist/html/assets/js',
    imagesDir: './dist/html/assets/img',
    fontsDir: './dist/html/assets/fonts',
    cssDir: './dist/html/assets/css',
    templates: './dist/html/templates/*.html'
}


// Task runners
gulp.task('build', function(cb) {
    runSequence('clean', ['scripts', 'sass', 'images', 'templates', 'copyassets'], 'prettify-templates', cb);
});

gulp.task('default', function(cb) {
    runSequence('build', 'serve', 'watch', cb);
});




// TASKS
// ---------------------------------------------------------------------

gulp.task('clean', function(done){
    rimraf(dist.assetsDir + '/**/*', done);
});



gulp.task('copyassets', function(){
    return gulp.src(['src/assets/**/*', '!src/assets/{img,js,scss}/**/*', '!src/assets/scss'])
      .pipe(gulp.dest(dist.assetsDir));
});




//Optimize Images
gulp.task('images', function() {
    return gulp.src(src.images)
      .pipe(gulpif(PRODUCTION, imagemin({
        progressive: true
      })))
      .pipe(gulp.dest(dist.imagesDir));
});




//Compile JS
gulp.task('scripts', function() {
    return gulp.src(src.assetsDir + 'js/main.js')
        .pipe(include())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(gulpif(PRODUCTION, uglify()))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(gulp.dest(dist.scriptsDir))
        .pipe(reload({ stream: true }));
});





//Compile Sass into css and auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(src.sass)
        .pipe(sourcemaps.init())
        .pipe(sass(
        {
            includePaths: sassIncludePaths,
            outputStyle: 'expanded',
            errLogToConsole: true
        })
        .on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] }))
        .pipe(gulpif(PRODUCTION, cssnano()))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(gulp.dest(dist.cssDir))
        .pipe(reload({ stream: true }));
});





//Compile HTML Templates
gulp.task('templates', function() {
    gulp.src(src.templates)
        .pipe(twig())
        .pipe(gulp.dest(dist.htmlDir))
        .pipe(reload({ stream: true }));
});




// Prettify HTML Templates
gulp.task('prettify-templates', function() {
    gulp.src([
        dist.htmlDir + '/*.html',
        dist.htmlDir + '/posts/*.html'
        ], { base: './dist/html' })
        .pipe(gulpif(PRODUCTION, prettify({
            indent_with_tabs: true,
            preserve_newlines: true
        })))
        .pipe(gulpif(PRODUCTION, gulp.dest(dist.htmlDir)));
});




// BrowserSync Static server
gulp.task('serve', function(done) {
    browserSync.init({
        server: dist.htmlDir
    });
    done();
});




// Watch files and run tasks
gulp.task('watch', function() {
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.scripts, ['scripts']);
    gulp.watch(src.templates, ['templates']);
});