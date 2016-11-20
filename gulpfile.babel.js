import gulp from 'gulp';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import webpackConfig from './webpack.config.babel';
import webpack from 'webpack';

gulp.task("build", function() {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task('watch', ['webpack'], () => {
    return gulp.watch('src/**/*.js', ['webpack']);
});

gulp.task('webpack', ['build'], function(callback) {
    var config = Object.create(webpackConfig);
    config.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_debugger: false
            }
        })
    ];

    // run webpack
    webpack(config, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
        callback();
    });
});

gulp.task("default", ['build'], function() {
    return gulp.watch('src/**/*.js', ['build']);
});