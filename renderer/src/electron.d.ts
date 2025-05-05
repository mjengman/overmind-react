interface ElectronAPI {
    onGPTResponse: (callback: (data: string) => void) => void;
    onScreenshotTaken: (callback: (imageData: string) => void) => void;
  }
  
  interface Window {
    electronAPI?: ElectronAPI;
  }
  