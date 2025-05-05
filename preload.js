const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onGPTResponse: (callback) => ipcRenderer.on('gpt-response', (_event, value) => callback(value)),
});
