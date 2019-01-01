//引入
var gulp = require('gulp');
//编译scss
var sass = require('gulp-sass');
//压缩css
var cleanCss = require('gulp-clean-css');
//压缩js
var uglify = require('gulp-uglify');
//服务器端
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
//json数据
var data = require('./src/mock/data.json');
console.log(data)
    //编译scss
gulp.task('sass', function() {
    return gulp.src('src/scss/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css/'))
});

//监听
gulp.task('watch', function() {
    gulp.watch('src/scss/index.scss', gulp.series('sass'));
});

//服务
gulp.task('webserver', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            //中间件
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname; //  \page.html
                //默认图标
                if (pathname === '/favicon.ico') {
                    return res.end();
                }
                //判断是否是文件还是接口
                if (pathname === '/api/list') {
                    return res.end(JSON.stringify({ code: 1, data: data }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    return res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
});

//开发任务
gulp.task('dev', gulp.parallel('watch', 'webserver'));