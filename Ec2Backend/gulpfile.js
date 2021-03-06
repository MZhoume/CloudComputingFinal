const fs = require('fs');
const gulp = require('gulp');
const del = require('del');
const zip = require('gulp-zip');
const gssh = require('gulp-ssh');

const paths = {
    clean: ['dist/**', '!dist', '!dist/package.json', '!dist/node_modules', '!dist/node_modules/**'],
    app: ['dist/**', '!dist/node_modules', '!dist/node_modules/**'],
    dist: ['dist/**']
};

const ssh = new gssh({
    ignoreErrors: false,
    sshConfig: {
        host: 'ec2-54-84-217-246.compute-1.amazonaws.com',
        port: 22,
        username: 'ubuntu',
        privateKey: fs.readFileSync('/Users/ming/.ssh/eb-cc-hw')
    }
});

gulp.task('default', ['clean']);

gulp.task('clean', function () {
    return del(paths.clean);
});

gulp.task('deploy', function () {
    return gulp.src(paths.app)
        .pipe(ssh.dest('/home/ubuntu/app/'));
});
