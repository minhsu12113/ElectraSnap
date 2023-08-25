const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path') 
const screenshot = require('desktop-screenshot')

let mainWindow;
let historyWindow;
let snapWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
      width: 478,
      height: 279, 
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

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})


ipcMain.on('mimizedWindow', () => {
    BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on('appExit', () => {
    app.quit();
});

function electSnap(){
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            screenshot(path.join(__dirname,'screenshot.png'), function(error, complete) {
                if(error)
                console.log("Screenshot failed", error);
                else
                    {                        
                        imgpath = path.join(__dirname,'screenshot.png');
                        resolve(imgpath)
                    }
            })
        },250);
      });  
}

ipcMain.handle('snapshot', async () => {
    mainWindow.hide();
    let path;
    path = await electSnap();
    return path;
});

ipcMain.on('open-snapshot-window', (event, imgpath) => {
    snapWindow = new BrowserWindow(
    {
        webPreferences: {
        preload: path.join(__dirname,'preload.js')
      },
        fullscreen: true,
        frame: false,
        resizable: false,
        autoHideMenuBar: true,
        icon: path.join(__dirname,'assets', 'elec-icon.ico')
    })    

    snapWindow.loadFile('./src/views/snapshot-window.html');
    snapWindow.webContents.send('show-img', imgpath)
    //snapWindow.openDevTools();
    //mainWindow.s
})

ipcMain.on('openWindowHis', () => {
    historyWindow = new BrowserWindow({
        webPreferences: {
          preload: path.join(__dirname,'preload.js')
        },        
        autoHideMenuBar: true,
        icon: path.join(__dirname,'assets', 'elec-icon.ico'),
    })
    historyWindow.loadFile('./src/views/history-window.html');
    mainWindow.hide();
});