const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  mimizedWindow: () => ipcRenderer.send('mimizedWindow'),
  appExit: () => ipcRenderer.send('appExit'),
  snapshot: () => ipcRenderer.invoke('snapshot'),
  openSnapshotWindow: (imgPath) => ipcRenderer.send('open-snapshot-window', imgPath),
  openWindowHis: () => ipcRenderer.send('openWindowHis'),
  showImg: (callback) => ipcRenderer.on('show-img', callback)
})