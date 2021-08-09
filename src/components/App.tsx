import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import { fetchModulePlugin } from '../plugins/fetch-module-plugin';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import '../styles/App.css';

const App = () => {
  const ref = useRef<any>();
  const [inputCode, setInputCode] = useState('');
  const [code, setCode] = useState('');

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

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchModulePlugin(inputCode)],
      define: { 'process.env.NODE_ENV': '"production"', global: 'window' },
    });

    // console.log(result);

    setCode(result.outputFiles[0].text);
    try {
      eval(result.outputFiles[0].text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='app'>
      <textarea
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick} disabled={!inputCode}>
          Submit
        </button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};
export default App;
