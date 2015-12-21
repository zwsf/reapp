// #! /usr/bin/env node

// 1.强制删除原asset tpl目录
// 2.根据entry下的html生成tpl模板
// 3.生成webpack html配置
// 4.打包生成asset

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var hash = '{%=o.webpack.hash%}';
var buildConfig = require('../enx-build-config');

scanHTML(buildConfig.documentRoot);

/**
 * 生成模板资源
 *
 */
function createTPL(from, to, fileName) {
    mkdir('tpl', function () {
        var str = replaceTemplate(loadTemplate(from), fileName, fileName + '.' + hash);
        str = replaceTemplate(str, 'common', 'common.' + hash);
        str = replaceTemplate(str, '<script src="http://localhost:' + buildConfig.port + '/webpack-dev-server.js"></script>', '');
        createTemplate(str, to);
    });
}

/**
 * 扫描项目中的html资源
 *
 */
function scanHTML(destinationPath) {
    fs.readdir(destinationPath, function(err, files) {
        files = excludeFile(files);
        files.forEach(function (file, i) {
            fs.stat(path.join(destinationPath, file), function (err, stat) {
                if (stat.isDirectory()) {
                    scanHTML(path.join(destinationPath, file));
                }
                else if (stat.isFile()){
                    if (path.extname(file) === '.html') {
                        var fileName = path.basename(file, '.html');
                        var fromPath = path.join(destinationPath, file);
                        var toPath = path.join(destinationPath, '..', 'tpl', file);

                        createTPL(fromPath, toPath, fileName);
                    }
                }
            });
        });
    });
}

/**
 * 去除临时 备份等文件
 *
 */
function excludeFile(files) {
    files.forEach(function (file, i) {
        if (/^\.(.*)(swp|swo)$/.test(file)
            || /^(.*\.bak)$/.test(file)
            || buildConfig.exclude.indexOf(file) !== -1
        ) {
            files.splice(i, 1);
            return false;
        }
    });

    return files;
}

/**
 * 创建目标文件
 *
 */
function mkdir(destinationPath, fn) {
    mkdirp(destinationPath, 0755, function(err){
        if (err) throw err;
        console.log('   \033[36mcreate\033[0m : ' + destinationPath);
        fn && fn();
    });
}

/**
 * 替换模板字符串
 *
 */
function replaceTemplate(str, from, to) {
    return str.replace(new RegExp(from, 'ig'), to);
}

/**
 * 生成模板资源
 *
 */
function createTemplate(str, destinationPath) {
    fs.writeFileSync(destinationPath, str, {mode: 0666})
}

/**
 * 载入模板资源
 *
 */
function loadTemplate(name) {
    return fs.readFileSync(name, 'utf8');
}
