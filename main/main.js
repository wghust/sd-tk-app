/**
* Author:      "止水",
* QQ:          "1075296345"
* Email:       "zhishui@tongbanjie.com"
* Date:        "2019-06-05 16:00:31"
* Version:     "0.1.0"
* Description: "压缩工具"
**/

const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  dialog
} = require('electron');

const { compress } = require('./compress');
const fs = require('fs');
const exec = require('child_process').exec;

let mainWindow;
let dirCache = '/Users/zhishui/Documents/';
let fileCache = '';

// 全屏
global.handleFullScreen = () => {
  ipcMain.on('fullscreen', (event, arg) => {
    if (arg.isFullScreen) {
      mainWindow.setFullScreen(true);
    } else {
      mainWindow.setFullScreen(false);
    }
    event.sender.send('setFullScreenRepay', {
      code: 0
    });
  });

  ipcMain.on('checkIsFullScreen', (event, arg) => {
    event.sender.send('checkIsFullScreenRepay', {
      isFullScreen: mainWindow.isFullScreen()
    });
  });
};

global.handleDragFile = () => {
  const getFileName = (filePath) => {
    return filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
  };

  const getDefaultPath = (filePath) => {
    const fileName = getFileName(filePath);
    return dirCache + fileName;
  };

  const setDefaultPath = (filePath) => {
    dirCache = filePath.substring(0, filePath.lastIndexOf('/') + 1);
  };

  ipcMain.on('getCompressFileData', (event, arg) => {
    dialog.showSaveDialog(mainWindow, {
      defaultPath: getDefaultPath(fileCache),
      filters: [{
        name: 'Images',
        extensions: ['jpg', 'png', 'gif', 'jpeg']
      }]
    }, (filename, bookmark) => {
      if (filename) {
        fs.copyFile(fileCache, filename, (err) => {
          if (err) {
            throw err;
          }
        });
        setDefaultPath(filename);
      }
    });
  });

  ipcMain.on('getFileData', (event, arg) => {
    if (fileCache !== '') {
      exec('rm -rf ' + fileCache);
    }

    compress(arg, (err, result) => {
      const localFilePath = result.filePath;
      let backData = {};
      if (err) {
        backData = {
          code: -1,
          msg: err
        };
      } else {
        backData = {
          code: 0,
          msg: '压缩成功',
          data: result
        };
        dialog.showSaveDialog(mainWindow, {
          defaultPath: getDefaultPath(localFilePath),
          filters: [{
            name: 'Images',
            extensions: ['jpg', 'png', 'gif', 'jpeg']
          }]
        }, (filename, bookmark) => {
          if (filename) {
            fs.copyFile(localFilePath, filename, (err) => {
              if (err) {
                throw err;
              }
            });
            backData.data.filePath = filename;
            backData.data.reName = getFileName(filename);
            setDefaultPath(filename);
          }
          fileCache = localFilePath;
          event.sender.send('getFileDataRepay', backData);
        });
      }
    });
  });
};

// 初始化项目
const initProject = () => {
  // handleFullScreen();
  handleDragFile();
};

// 创建界面
global.createWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'Squirtle',
    width: 450,
    height: 450,
    titleBarStyle: 'hidden',
    resizable: false,
    fullscreenable: false,
    center: true,
    icon: './logo.icns'
  });

  mainWindow.loadFile('./views/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.platform === 'darwin') {
    const template = [{
      label: app.getName(),
      submenu: [{
        label: '关于',
        role: 'about'
      }, {
        type: 'separator'
      }, {
        label: '关闭',
        role: 'quit'
      }]
    }, {
      label: '编辑',
      submenu: [{
        role: 'undo'
      }, {
        role: 'redo'
      }, {
        label: '复制',
        accelerator: 'Cmd+C',
        role: 'copy'
      }, {
        label: '粘贴',
        accelerator: 'Cmd+V',
        role: 'paste'
      }, {
        label: '剪贴',
        accelerator: 'Cmd+X',
        role: 'cut'
      }]
    }, {
      label: '帮助',
      role: 'help'
    }];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  } else {
    Menu.setApplicationMenu(null);
  }

  initProject();
};

// 初始化配置
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
