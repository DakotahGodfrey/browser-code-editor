import { useState, useEffect } from 'react';
import '../styles/App.css';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import bundleCode from '../esbuildBundler';
import Resizable from './Resizable';
import { Cell } from '../app/types/Cell';
import { useAppDispatch, useAppSelector } from '../app/hooks/hooks';
import { updateCell } from '../app/slices/cells';
import {
  bundleStart,
  bundleEnd,
  createBundle,
  selectBundles,
} from '../app/slices/bundles';

interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { id, content } = cell;
  const dispatch = useAppDispatch();
  const bundle = useAppSelector(selectBundles);
  const { data } = bundle;
  const { loading } = data[id];
  const handleInputChange = (value: string) => {
    dispatch(updateCell({ id, content: value }));
  };

  useEffect(() => {
    const createBundleAsync = async () => {
      dispatch(bundleStart({ id }));
      await dispatch(createBundle({ id, inputCode: content }));
      dispatch(bundleEnd({ id }));
    };

    if (!bundle) {
      createBundleAsync();
    }
    const bundleTimer = setTimeout(async () => {
      createBundleAsync();
    }, 1500);
    return () => {
      clearTimeout(bundleTimer);
    };
  }, [content, dispatch, id]);

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
        {!bundle || loading ? (
          <div className='progress-cover'>
            <progress
              className='progress is-small is-primary'
              max='100'
            ></progress>
          </div>
        ) : (
          <CodePreview
            inputCode={data[id]?.code ?? ''}
            bundleStatus={data[id]?.error ?? ''}
          />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
