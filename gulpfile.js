const buildFolder = "dist";
const sourceFolder = "src";

const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    img: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    html: [`${sourceFolder}/*.html`, `!${sourceFolder}/_*.html`],
    css: `${sourceFolder}/scss/style.scss`,
    js: `${sourceFolder}/js/script.js`,
    img: `${sourceFolder}/img/**/*.+(png|jpg|gif|ico|svg|webp)`,
    fonts: `${sourceFolder}/fonts/*.ttf`,
  },
  watch: {
    html: `${sourceFolder}/**/*.html`,
    css: `${sourceFolder}/scss/**/*.scss`,
    js: `${sourceFolder}/js/**/*.js`,
    img: `${sourceFolder}/img/**/*.+(png|jpg|gif|ico|svg|webp)`,
  },
  clean: `./${buildFolder}/`
};

const {src, dest} = require("gulp")
const gulp = require("gulp")
const browserSync = require("browser-sync").create();
const fileInclude = require("gulp-file-include");
const del = require("del");
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const groupMedia = require("gulp-group-css-media-queries");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const hash = require('gulp-hash-filename');

function browserReloader() {
  browserSync.init({
    server: {
      baseDir: `./${buildFolder}/`
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileInclude())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(hash())
    .pipe(scss({
      outputStyle: "expanded"
    }))
    .pipe(groupMedia())
    .pipe(autoprefixer({
      // overrideBrowserslist: ["last 10 versions"],
      cascade: true,
      flexbox: true
    }))
    .pipe(dest(path.build.css))
    .pipe(cleanCss())
    .pipe(rename({
      extname: '.min.css'
      
    }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream())
}

function js() {
  return src(path.src.js)
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    .pipe(hash())
    .pipe(fileInclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interplaced: true,
      optimizationLevel: 7
    }))
    .pipe(dest(path.build.img))
    .pipe(browserSync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean() {
  return del(path.clean)
}

const build = gulp.series(clean, gulp.parallel(js, css, html, images))
const watch = gulp.parallel(build, watchFiles, browserReloader);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
