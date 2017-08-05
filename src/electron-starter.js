const electron = require('electron');
const path = require('path');
const url = require('url');
const ffmpeg = require('fluent-ffmpeg');
const _ = require('lodash');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      backgroundThrottling: false
    }
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', () => mainWindow = null);
}

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

ipcMain.on('videos:added', (ev, videos) => {
  const getMetadataPromises = _.map(videos, video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        resolve(Object.assign({}, video, {
          duration: metadata.format.duration,
          format: 'avi'
        }));
      });
    });
  });

  Promise.all(getMetadataPromises)
         .then(results => {
           mainWindow.webContents.send('metadata:complete', results)
         });
});

ipcMain.on('conversion:start', (ev, videos) => {
  _.each(videos, video => {
    const outputDirectory = video.path.split(video.name)[0];
    const outputName = video.name.split('.')[0];
    const outputPath = `${outputDirectory}${outputName}.${video.format}`;
    console.log(outputDirectory);
    console.log(outputPath);

    ffmpeg(video.path)
        .output(outputPath)
        .on('progress', ({ timemark }) =>
            mainWindow.webContents.send('conversion:progress', { video, timemark })
        )
        .on('end', () =>
            mainWindow.webContents.send('conversion:end', { video, outputPath })
        )
        .run();
  });
});
