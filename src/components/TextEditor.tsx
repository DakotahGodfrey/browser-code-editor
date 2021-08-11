import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';

const TextEditor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<any>('**Hello world!!!**');
  const [editMode, setEditMode] = useState(false);
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
        <MDEditor value={value} onChange={setValue} />
      </div>
    );
  }
  return (
    <section
      onClick={() => {
        setEditMode(true);
      }}
    >
      <MDEditor.Markdown source={value} />
    </section>
  );
};

export default TextEditor;
