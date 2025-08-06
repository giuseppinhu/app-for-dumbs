const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  downloadImages: (images) => ipcRenderer.send('download-and-zip', images),
  onDownloadComplete: (callback) => ipcRenderer.on('download-complete', callback)
});
