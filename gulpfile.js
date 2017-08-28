const concat = require("gulp-concat");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const inject = require("gulp-inject");
const del = require("del");

const configs = [
  {
    name: "form-wizard",
    base_path: "./public/plugins/form-wizard"
  },
  {
    name: "main",
    base_path: "./public"
  }
];
var jsFiles = "assets/scripts/**/*.js",
  jsDest = "dist/scripts";

gulp.task("scripts", ["clean:scripts"], function() {
  return (() => {
    configs.forEach(config => {
      gulp
        .src(config.base_path + "/src/scripts/**/*.js")
        .pipe(concat("scripts.js"))
        .pipe(gulp.dest(config.base_path + "/dist/js"))
        .pipe(rename({ suffix: ".min" }))
        //.pipe(uglify())
        .pipe(gulp.dest(config.base_path + "/dist/js"));
    });
  })();
});
gulp.task("styles", ["clean:styles"], function() {
  return (() => {
    configs.forEach(config => {
      gulp
        .src(config.base_path + "/src/styles/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(config.base_path + "/dist/css/"))
        .pipe(rename({ suffix: ".min" }))
        //.pipe(sourcemaps.init())
        .pipe(
          cleanCSS({ debug: true }, function(details) {
            console.log(details.name + ": " + details.stats.originalSize);
            console.log(details.name + ": " + details.stats.minifiedSize);
          })
        )
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(config.base_path + "/dist/css/"));
    });
  })();
});

// gulp.task("index", function() {
//   return (() => {
//     configs.forEach(config => {
//       var target = gulp.src(config.base_path + "/src/index.html");
//       // It's not necessary to read the files (will speed up things), we're only after their paths:
//       var sources = gulp.src(
//         [
//             config.base_path +"/dist/js/**/*.min.js",
//             config.base_path +"/dist/css/**/*.min.css",
//           "https://fonts.googleapis.com/css?family=Quicksand",
//           "https://fonts.googleapis.com/css?family=Roboto",
//           "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
//           "/assets/css/bootstrap.min.css",
//           "//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css",
//           "/assets/css/mdb.min.css",
//           "/styles/main.css",
//           '/assets/js/jquery-3.1.1.min.js',
//           '/assets/js/popper.min.js',
//           '/assets/js/bootstrap.min.js',
//           '/assets/js/mdb.min.js'
//         ],
//         { read: false }
//       );

//       target.pipe(inject(sources)).pipe(gulp.dest(config.base_path+'/'));
//     });
//   })();
// });

gulp.task("clean:scripts", function() {
  return (() => {
    configs.forEach(config => {
      del([config.base_path + "/dist/js", config.base_path + "/dist/scripts"]);
    });
  })();
});
gulp.task("clean:styles", function() {
  return (() => {
    configs.forEach(config => {
      del([config.base_path + "/dist/css", config.base_path + "/dist/styles"]);
    });
  })();
});

gulp.task("clean", ["clean:styles", "clean:scripts"]);
gulp.task("build", ["clean", "styles", "scripts"]);
gulp.task("watch", function() {
  (() => {
    configs.forEach(config => {
      gulp.watch(config.base_path + "/src/styles/**/*.scss", ["styles"]);
      gulp.watch(config.base_path + "/src/scripts/**/*.js", ["scripts"]);
    //   gulp.watch(config.base_path + "/src/index.html", ["index"]);
    });
  })();
});
gulp.task("default", ['build',"watch"]);
