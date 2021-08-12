import { useState, useEffect } from 'react';
import '../styles/App.css';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import bundleCode from '../esbuildBundler';
import Resizable from './Resizable';
import { Cell } from '../app/types/Cell';
import { useAppDispatch } from '../app/hooks/hooks';
import { updateCell } from '../app/slices/cells';

interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [outputCode, setOutputCode] = useState('');
  const [error, setError] = useState('');
  const { id, content } = cell;
  const dispatch = useAppDispatch();

  const handleInputChange = (value: string) => {
    dispatch(updateCell({ id, content: value }));
  };

  useEffect(() => {
    const bundleTimer = setTimeout(async () => {
      const result = await bundleCode(content);
      setOutputCode(result.code);
      setError(result.error);
    }, 1500);
    return () => {
      clearTimeout(bundleTimer);
    };
  }, [content]);

  return (
    <Resizable direction={'y'}>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='x'>
          <CodeEditor
            initialValue={content}
            onChange={(value) => handleInputChange(value)}
          />
        </Resizable>
        <CodePreview inputCode={outputCode} bundleStatus={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
