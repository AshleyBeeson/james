var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

//gulp automates tasks

gulp.task('default', function(){
	return gutil.log('Gulp is working');
});

//watch for changes to scss files (in specific directory)
gulp.task('watch', function(){
	gulp.watch('C:\Users\abeeson\Desktop\Training\BAE\James\James Charlesworth MERN 2\James Assessment mk2\client\public\css\*.scss', ['build-css']);
});

//when a change is seen, convert scss file to css file and use it immediately
gulp.task('build-css', function(){
	return gulp.src('client/public/css/*.scss').pipe(sass()).pipe(gulp.dest('client/public/css'));
});
