const gulp        = require('gulp');                        // использование пакета gulp
const browserSync = require('browser-sync');                // использование пакета browser-sync
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Запуск live сервера
gulp.task('server', function() {          
    browserSync.init({
        server: {
            baseDir: "src"       // Путь к файлам
        }
    });
});


gulp.task('styles', function() {         
    return gulp.src("src/sass/*.+(scss|sass)")         // Путь к файлам для изменений
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))    // Компиляция стиля кода, с выводом возможной ошибки
            .pipe(rename({
                prefix: "",
                suffix: ".min"
              }))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })) 
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("src/css"))                    // Вывод в папку
            .pipe(browserSync.stream());                   // Обновление страницы после выполнение компиляции
});

gulp.task('watch', function(){                                              // Обновление live сервера после изменений файлов
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("src/*.html"). on("change", browserSync.reload);
})

gulp.task('default', gulp.parallel('watch','server','styles'));            // Параллельно запускаем задачи описанные в gulp