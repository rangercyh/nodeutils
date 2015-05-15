var reg = /[^\w\d_]/ig;
var wrongFile = [];
var wrongDir = [];
var totalFile = 0;

var fs = require('fs');
var path = require('path');

function reg_check(name) {
	if (reg.test(path.basename(name, path.extname(name)))) {
		return true;
	}
	return false;
}

function walk(dir) {
	var dirList = fs.readdirSync(dir),
		temp;
	dirList.forEach(function(item) {
		temp = dir + '/' + item;
		if (fs.statSync(temp).isDirectory()) {
			if (reg_check(item)) {
				wrongDir.push(temp);
			}
			walk(temp);
		} else {
			if (reg_check(item)) {
				wrongFile.push(temp);
			}
			++totalFile;
		}
	});
}

walk(path.resolve(process.cwd()));
console.log('本检查只允许文件或文件夹名使用字母、数字和下划线');
console.log('所有文件数量 = ', totalFile);
console.log('错误文件 = ', wrongFile.length);
console.log(wrongFile);
console.log('错误文件夹 = ', wrongDir.length);
console.log(wrongDir);
