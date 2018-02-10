const gulp      = require('gulp'),
    sass        = require('gulp-sass'),
    plumber     = require('gulp-plumber');

// Tache watch

gulp.task('default', function(){
    gulp.watch('css/**/*.scss', ['sass']);
});

// Tache de compilation des fichiers Sass

gulp.task('sass', function() {
    return gulp.src('css/**/*.scss') // Prend tous les fichiers .scss dans le dossier /css
        .pipe(plumber()) // Empeche le la tache de s'arreter s'il y a une erreur
        .pipe(sass({outputStyle: 'compressed'}))   //Compile en css
        .pipe(gulp.dest('css')); // Dossier de destination des css compilés
});