const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const screenshot = require('screenshot-desktop');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL('http://localhost:5173');

  // 🔥 Register global hotkey
  globalShortcut.register('CommandOrControl+H', async () => {
    try {
      const filePath = await screenshot({ filename: 'screenshot.png' });
      console.log('📸 Screenshot saved to:', filePath);
    } catch (err) {
      console.error('❌ Failed to take screenshot:', err);
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ✅ Clean up hotkeys when app quits
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
