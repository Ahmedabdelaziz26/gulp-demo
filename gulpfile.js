
const { src, dest, series , watch,parallel} = require('gulp');

const globs = {
  html: "project/**/*.html",
  css: "project/css/**/*.css",
  js: "project/js/**/*.js",
  json: "project/*.json", // Add JSON file path
};


const htmlmin = require("gulp-html-minifier-terser");
// html task
function htmlTask() {
    //read file
   return src(globs.html)
   //minfiy
//    .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
   .pipe(htmlmin({removeComments:true}))
    // move to dist
    .pipe(dest("dist"))
}

exports.h= htmlTask



const concat =require("gulp-concat")
const cleanCSS = require('gulp-clean-css');
function cssTask() {
    // read files
   return src(globs.css)
    // concat to one file
    .pipe(concat("style.min.css"))
    // minify
    .pipe(cleanCSS())
    // move to dist
    .pipe(dest("dist/assets/css"))
}


exports.css =cssTask


const terser = require('gulp-terser');
function jsTask() {
    return src(globs.js,{sourcemaps:true})
    .pipe(concat("script.min.js"))
    .pipe(terser())
    .pipe(dest("dist/assets/js" ,{sourcemaps:"."}))
}

exports.js = jsTask

// New task to minify JSON data
const jsonminify = require("gulp-json-minify");
function minifyJson() {
    return src(globs.json)
        .pipe(jsonminify())
        .pipe(dest('dist'));
}

exports.minifyJson = minifyJson;



function watchTask(){
    watch(globs.html,htmlTask)
    watch(globs.css,cssTask)
    watch(globs.js,jsTask)
    watch(globs.img,imgTask)
}

function dummyTask(done){
    // logic
    console.log("test !");
    done()
}

//default //gulp
exports.default = series(
  parallel(htmlTask, cssTask, jsTask, minifyJson),
  dummyTask,
  watchTask
);

