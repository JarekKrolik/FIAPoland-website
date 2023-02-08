const sass = require("gulp-sass")(require("sass"));
const { src, dest, series, parallel, watch } = require("gulp");
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const kit = require("gulp-kit-2");

const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");

const reload = browserSync.reload;

const sourcemaps = require("gulp-sourcemaps");
const paths = {
  html: "./html/**/*.kit",
  sass: "./src/sass/**/*.scss",
  js: "./src/javascript/**/*.js",
  img: "./src/img/**/*.jpg",
  destSass: "./dist/css",
  destJs: "./dist/js",
  destImg: "./dist/img",
  dist: "./dist",
};

function liveSeversync(cb) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  cb();
}

function handleKits(cb) {
  src(paths.html).pipe(kit()).pipe(dest("./"));

  cb();
}

function clearAll(cb) {
  return src(paths.dist, {
    read: false,
  }).pipe(clean());

  cb();
}

function sassCompiler(cb) {
  src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: "-min",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest(paths.destSass));

  cb();
}

function javaScript(cb) {
  src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        suffix: "-min",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest(paths.destJs));
  cb();
}

async function imageMin(cb) {
  const imagemin = (await import("gulp-imagemin")).default;

  src(paths.img)
    .pipe(imagemin())

    .pipe(dest(paths.destImg));
  cb();
}

function watchForChanges(cb) {
  watch("./*.html").on("change", reload);
  watch(
    [paths.sass, paths.js, paths.html],
    parallel(sassCompiler, javaScript, handleKits)
  ).on("change", reload);
  watch(paths.img, imageMin).on("change", reload);

  cb();
}

const mainFunctions = parallel(
  sassCompiler,
  javaScript,
  imageMin,
  watchForChanges,
  handleKits
);
exports.default = series(mainFunctions, liveSeversync);
exports.clearAll = clearAll;
