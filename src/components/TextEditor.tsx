import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '../app/hooks/hooks';
import { updateCell } from '../app/slices/cells';
import { Cell } from '../app/types/Cell';
interface TextEditorProps {
  cell: Cell;
}
const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [editMode, setEditMode] = useState(false);
  const { id, content } = cell;
  const dispatch = useAppDispatch();
  const handleTextChange = (value: string) => {
    dispatch(
      updateCell({
        id,
        content: value,
      })
    );
  };

  useEffect(() => {
    const handleEditModeClick = (e: MouseEvent) => {
      if (
        editorRef.current &&
        e.target &&
        editorRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setEditMode(false);
    };
    document.addEventListener('click', handleEditModeClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleEditModeClick, {
        capture: true,
      });
    };
  }, []);

  if (editMode) {
    return (
      <div ref={editorRef} className='text-editor'>
        <MDEditor
          value={content}
          onChange={(value) => {
            handleTextChange(value || '');
          }}
        />
      </div>
    );
  }
  return (
    <section
      onClick={() => {
        setEditMode(true);
      }}
    >
      <MDEditor.Markdown source={content} />
    </section>
  );
};

export default TextEditor;
