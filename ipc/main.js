'use strict';

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

//> keep a global reference of the window object, if you don't, the window will
//> be closed automatically when the JavaScript object is garbage collected.
let win = null;

//> create the browser window
function createWindow() {
    win = new BrowserWindow({width: 400, height: 300});

    //> load the index.html of the app
    win.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: path.join(__dirname, 'app/index.html')
    }));

    //> open the DevTools
    //win.webContents.openDevTools();

    //> emitted when the window is closed
    win.on('closed', () => {
        //> dereference the window object, usually you would store windows
        //> in an array if your app supports multi windows, this is the time
        //> when you should delete the corresponding element
        win = null
    });
}

//> This method will be called when Electron has finished
//> initialization and is ready to create browser windows.
//> Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

//> Quit when all windows are closed
app.on('window-all-closed', () => {
    //> On macOS it is common for applications and their menu bar
    //> to stay active until the user quits explicitly with Cmd+Q
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    //> On macOS it is common to re-create a window in the app when the
    //> dock icon is clicked and there are no other windows open
    if(win === null) {
        createWindow();
    }
});

//> ipcMain is ipc of main process
//> ipcMain listen to close-main-window channel here
ipcMain.on('close-main-window', () => {
    console.log('closed by ipc');
    app.quit();
});
