import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [message, setMessage] = useState('Waiting for screenshot...');
  const [screenshot, setScreenshot] = useState<string | null>(null);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onGPTResponse((data) => {
        setMessage(data);
      });

      window.electronAPI.onScreenshotTaken((imageData) => {
        setScreenshot(imageData);
      });
    }
  }, []);

  return (
    <div className="p-4 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Overmind is Online 🧠</h1>

      {screenshot && (
        <div className="flex justify-center mb-6">
          <img src={screenshot} alt="Screenshot" className="max-w-full max-h-[400px] rounded border" />
        </div>
      )}

      <div className="prose prose-invert max-w-2xl mx-auto text-white">
        <ReactMarkdown>
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
