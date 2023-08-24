const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path') 

let mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
      width: 478,
      height: 329, 
      webPreferences: {
        preload: path.join(__dirname,'preload.js')
      },
      frame: false,
      resizable: false,
      autoHideMenuBar: true,
      transparent: true,
      icon: path.join(__dirname,'assets', 'elec-icon.ico'),
    })
    mainWindow.loadFile('./src/views/index.html');
    //mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
});

ipcMain.on('mimizedWindow', () => {
    BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on('appExit', () => {
    app.quit();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})
