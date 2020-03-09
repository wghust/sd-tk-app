const fs = require('fs');
const path = require('path');
const tinify = require('tinify');
const emailList = require('./email.json');

const getFileSize = (curPath) => {
  const stats = fs.statSync(curPath);
  return stats.size;
};

const compress = (arg, fn) => {
  // const folderPath = path.join(process.cwd(), 'tempfile');
  // exec('rm -rf ' + folderPath + '& mkdir ' + folderPath, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  const sourcePath = path.join(__dirname, '../tempfile/' + arg.name);
  // const sourcePath = '../tempfile/' + arg.name;
  // console.log(process.cwd(), __dirname);
  const imgData = arg.data.replace(/^data:image\/\w+;base64,/, '');
  const imgBuffer = new Buffer(imgData, 'base64');
  fs.writeFile(sourcePath, imgBuffer, (err) => {
    if (err) {
      throw err;
      // fn('创建文件失败', {});
    } else {
      const num = Math.floor(emailList.length * Math.random());
      tinify.key = emailList[num].apikey;
      const source = tinify.fromFile(sourcePath);
      source.toFile(sourcePath, (err) => {
        if (err) {
          fn('压缩文件失败', {});
        } else {
          const backData = {
            name: arg.name,
            oldSize: arg.size,
            newSize: getFileSize(sourcePath),
            filePath: sourcePath
          };
          fn(null, backData);
        }
      });
    }
  });
  // });
};

module.exports = {
  compress: compress
}