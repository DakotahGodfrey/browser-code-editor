import { useState } from 'react';
import '../styles/App.css';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import bundleCode from '../esbuildBundler';
import Resizable from './Resizable';

const CodeCell = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');

  const onClick = async () => {
    const result = await bundleCode(inputCode);
    setOutputCode(result);
  };
  return (
    <Resizable direction={'y'}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='x'>
          <CodeEditor
            initialValue={'console.log(123)'}
            onChange={(value: string) => {
              setInputCode(value);
            }}
          />
        </Resizable>
        <CodePreview inputCode={outputCode} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
