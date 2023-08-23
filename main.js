const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 378,
      height: 229, 
      // titleBarStyle: 'hidden',
      // titleBarOverlay: {
      //   color: '#333',
      //   symbolColor: '#FFF'
      // },
      frame: false,
      resizable: false,
      autoHideMenuBar: true,
      transparent: true,
      icon: './icon-bar.png'
    })
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})