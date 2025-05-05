const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onGPTResponse: (callback) => ipcRenderer.on('gpt-response', (_event, value) => callback(value)),
  onScreenshotTaken: (callback) => ipcRenderer.on('screenshot-taken', (_event, data) => callback(data)),
});
