import * as esbuild from 'esbuild-wasm';
import React, { useEffect, useState, useRef } from 'react';
import '../styles/App.css';

function App() {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const serviceRef = useRef<any>();

  const startEsbuild = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
  };

  useEffect(() => {
    startEsbuild();
  }, []);
  const handleSubmit = async () => {
    if (!serviceRef.current) {
      return;
    }
    const transpiled = await serviceRef.current.transform(inputCode, {
      loader: 'jsx',
      target: 'es2015',
    });

    setOutputCode(transpiled.code);
  };
  return (
    <div className='App'>
      <textarea
        name='code'
        id='code'
        onChange={(e) => setInputCode(e.target.value)}
      ></textarea>
      <div>
        <button onClick={() => handleSubmit()}>Compile</button>
      </div>
      <pre>{outputCode}</pre>
    </div>
  );
}

export default App;
