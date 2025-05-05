// src/electron.d.ts

export {};

declare global {
  interface Window {
    electronAPI: {
      onGPTResponse: (callback: (data: string) => void) => void;
    };
  }
}
