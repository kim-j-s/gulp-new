const {
  src,
  dest,
  task,
  watch,
  series,
  parallel
} = require('gulp');
const gulp = require('gulp');
// 폴더 정리
const del = require('del');
// path 정리
const options = require("./config");
// 파일인클루드
const fileinclude = require('gulp-file-include'); 
// 배포 시 html 정리
const prettyHtml = require('gulp-pretty-html');
// npm sass
const sass = require('gulp-sass')(require('sass'));
// -webkit
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
// purgecss 안쓰는 css 정리
const purgecss = require('gulp-purgecss')
// 브라우져 갱신
const browserSync = require('browser-sync').create();
// 변환 파일 감지
const count = require('gulp-count');
// 캐시
const cache = require('gulp-cached');

//Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base
    },
    port: options.config.port || 5000
  });
  done();
}

function previewReload(done) {
  // console.log("\n\t" + logSymbols.info, "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

function devHTML() {
  const options = {
    indentSize: 2
  }
  return src([
      `${options.paths.src.base}/**/*.html`,
      `!${options.paths.src.base}/**/_*.html`
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: options.paths.src.includeHtml
    }))
    .pipe(prettyHtml({
			indent_size: 2,
			indent_with_tabs: true
		}))
    .pipe( cache('html') ) 
    .pipe(dest(options.paths.dist.base))
    .pipe(count('<%= counter %> HTML files', {logFiles: true}));
}

function devStyles() {
  return src(`${options.paths.src.css}/**/*.*`)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    // .pipe(purgecss({
    //   content: ['src/**/*.html']
    // }))
    .pipe(dest(options.paths.dist.css))
    .pipe(count('<%= counter %> Style files', {logFiles: true}));
}

function devScripts() {
  return src(`${options.paths.src.js}/**/*.*`)
    .pipe(dest(options.paths.dist.js))
    .pipe(count('<%= counter %> JS files', {logFiles: true}));
}

function devImages() {
  return src(`${options.paths.src.img}/**/*`).pipe(dest(options.paths.dist.img));
}

// 
// function devGuideImages() {
//   return src(`${options.paths.src.guideImg}/**/*.png`).pipe(dest(options.paths.dist.guideImg));
// }

function devClean() {
  // console.log("\n\t" + logSymbols.info, "Cleaning dist folder for fresh start.\n");
  return del([options.paths.dist.base]);
}




function watchFiles() {
  watch(`${options.paths.src.base}/**/*.html`, series(devHTML, devStyles, previewReload));
  // watch(`${options.paths.src.guide}/**/*.*`, series(devGuide, previewReload));
  // watch(`${options.paths.src.guideImg}/**/*.*`, series(devGuideImages, previewReload));
  watch(`${options.paths.src.css}/**/*.*`, series(devStyles, previewReload));
  watch(`${options.paths.src.js}/**/*.js`, series(devScripts, previewReload));
  watch(`${options.paths.src.img}/**/*`, series(devImages, previewReload));
}




exports.default = series(
  devClean, // Clean Dist Folder
  parallel(devHTML, devStyles, devScripts, devImages), //Run All tasks in parallel
  livePreview, // Live Preview Build
  watchFiles // Watch for Live Changes
);