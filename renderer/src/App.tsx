import { useEffect, useState } from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import type { ComponentProps } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  const [message, setMessage] = useState('Waiting for screenshot...');
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const extractCode = (md: string) => {
    const match = md.match(/```[\s\S]*?```/);
    return match ? match[0] : '';
  };

  const explanationOnly = (md: string) => {
    const match = md.match(/```[\s\S]*?```/);
    return match ? md.replace(match[0], '').trim() : md;
  };

  const markdownComponents: Components = {
    code({
      inline,
      className,
      children,
      ...props
    }: ComponentProps<'code'> & { inline?: boolean }) {
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
  };

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onGPTResponse((data) => setMessage(data));
      window.electronAPI.onScreenshotTaken((imageData) => setScreenshot(imageData));
    }
  }, []);

  return (
    <div className="bg-black text-white h-screen overflow-hidden p-0 font-sans flex flex-col">
      <header className="text-3xl font-bold text-center py-4 shrink-0">
        Overmind is Online 🧠
      </header>

      <main className="flex-1 overflow-hidden flex flex-col justify-between max-w-9xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 overflow-hidden">
          {screenshot && (
            <div className="w-full overflow-auto">
              <img
                src={screenshot}
                alt="Screenshot"
                className="rounded border border-gray-600 shadow-lg object-cover max-w-full h-auto"
              />
            </div>
          )}

          <div className="prose prose-invert text-white text-left max-w-full lg:max-w-[48%]">
            <p>Problem:</p>
            <ReactMarkdown>{explanationOnly(message)}</ReactMarkdown>
          </div>
        </div>
        <hr className="border-t border-gray-700 my-6 w-full" />
        <div className="mt-4 max-w-6xl mx-auto w-full px-2 overflow-auto bg-[#1e1e1e] p-4 rounded shadow-lg max-h-[40vh]">
          <ReactMarkdown components={markdownComponents}>
            {extractCode(message)}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}

export default App;
