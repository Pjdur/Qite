const path = require('path');
const { app, BrowserWindow } = require('electron');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        },
    });

    mainWindow.loadURL('http://localhost:3000');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createWindow();
    webpack(webpackConfig).run((err, stats) => {
        if (err) {
            console.error(err);
        }
        console.log(stats.toString());
    });
});

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