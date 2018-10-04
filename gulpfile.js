const gulp=require("gulp");
const plumber=require("gulp-plumber");

const less=require("gulp-less");

const babel=require("gulp-babel");

console.log("gulp is watching");

var defaultPlumber=(err)=>{
    console.log(err);
};

var lessConfig={
    targets:["**/*.less","*.less"],
    base:"."
};

var reactConfig={
    targets:["**/*.jsx","*.jsx"],
    base:"."
};

gulp.watch(lessConfig.targets,()=>{
    gulp.src(lessConfig.targets,{base:lessConfig.base}).pipe(less()).pipe(gulp.dest(lessConfig.base));
});

gulp.watch(reactConfig.targets,()=>{
    gulp.src(reactConfig.targets,{base:reactConfig.base})
        .pipe(plumber(defaultPlumber))
        .pipe(babel({presets:["@babel/preset-react"]}))
        .pipe(gulp.dest(reactConfig.base));
});