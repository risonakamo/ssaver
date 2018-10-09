const gulp=require("gulp");

gulp.src([
    "img/*",
    "popup/*",
    "react/*.production.*",
    "saved/*",
    "shared/*",
    "manifest.json",

    "!**/*.jsx",
    "!**/*.less"
],{base:"."})
.pipe(gulp.dest("build"));