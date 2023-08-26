const { app, BrowserWindow, ipcMain,Notification  } = require('electron')
const path = require('path') 
const screenshot = require('desktop-screenshot')
const nativeImage = require('electron').nativeImage
const { clipboard } = require('electron')

let mainWindow;
let historyWindow;
let snapWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
      width: 378,
      height: 179, 
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

const NOTIFICATION_TITLE = 'ElectraSnap'
const NOTIFICATION_BODY = 'The image has been copied to the clipboard'

function showNotification () {
  new Notification(
    { 
        title: NOTIFICATION_TITLE, 
        body: NOTIFICATION_BODY,
        icon: path.join(__dirname,'assets', 'elec-icon.ico'),
    }).show()
}


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

ipcMain.on('receive-base64-img', (event,data) => {
   var img = nativeImage.createFromDataURL(data);
   clipboard.writeImage(img, 'png');
   snapWindow.close();
   showNotification();
   mainWindow.show();
});