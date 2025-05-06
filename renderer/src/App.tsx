import { useEffect, useState } from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  const [message, setMessage] = useState('Waiting for screenshot...');
  const [screenshot, setScreenshot] = useState<string | null>(null);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onGPTResponse((data: string) => setMessage(data));
      window.electronAPI.onScreenshotTaken((imageData: string) => setScreenshot(imageData));
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Overmind is Online 🧠</h1>

      {screenshot && (
        <div className="mb-6 max-w-[90%]">
          <img
            src={screenshot}
            alt="Screenshot"
            className="max-h-[400px] mx-auto rounded border border-gray-600 shadow-lg"
          />
        </div>
      )}

      <div className="prose prose-invert max-w-2xl mx-auto text-white">
        <ReactMarkdown
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }: {
              inline?: boolean;
              className?: string;
              children?: React.ReactNode;
              [key: string]: any;
            }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
