import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Waiting for screenshot...');

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onGPTResponse((data) => {
        setMessage(data);
      });
    }
  }, []);

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Overmind is Online 🧠</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
