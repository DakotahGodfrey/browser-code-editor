import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import { fetchModulePlugin } from '../plugins/fetch-module-plugin';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import '../styles/App.css';
import CodeEditor from './CodeEditor';

const App = () => {
  const ref = useRef<any>();
  const codePreview = useRef<any>();
  const [inputCode, setInputCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    codePreview.current.srcdoc = html;
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchModulePlugin(inputCode)],
      define: { 'process.env.NODE_ENV': '"production"', global: 'window' },
    });
    codePreview.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      '*'
    );
  };
  const html = ` 
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (e) => {
          try{
            eval(e.data);
          } catch(err) {
            const root = document.getElementById('root');
            root.style.backgroundColor = '#333'
            root.style.color = '#eee'
            root.innerHTML = '<div style="padding: 1rem"><h4>Runtime Error</h4>'+ err +'</div>'
            console.error(err);
          }
        }, false)
      </script>
    </body>
  </html>
  `;

  return (
    <div className='app'>
      <textarea
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      ></textarea>
      <CodeEditor
        initialValue={'console.log(123)'}
        onChange={(value: string) => {
          setInputCode(value);
        }}
      />
      <div>
        <button onClick={onClick} disabled={!inputCode}>
          Submit
        </button>
      </div>
      <iframe
        ref={codePreview}
        src='/test.html'
        sandbox='allow-scripts'
        srcDoc={html}
        title='code-sandbox'
      />
    </div>
  );
};
export default App;
