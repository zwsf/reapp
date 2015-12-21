
var cp = require('child_process');
cp.exec('rm -rf asset tpl && node lib/build.js && webpack --config enx-build-config.js -p && rm -rf tpl', function (err, stdout, stderr) {
    if (err) {
        console.log(err);
    }

    console.log(stdout);
    console.log(stderr);
});

