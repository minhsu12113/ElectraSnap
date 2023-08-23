const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  mimizedWindow: () => ipcRenderer.send('mimizedWindow'),
  appExit: () => ipcRenderer.send('appExit'),
})