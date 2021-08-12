import React from 'react';
import { useAppDispatch } from '../app/hooks/hooks';
import { deleteCell, moveCell } from '../app/slices/cells';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';

interface FeedCellProps {
  cell: {
    id: string;
    type: 'code' | 'text';
    content: string;
  };
}
const FeedCell: React.FC<FeedCellProps> = ({ cell }) => {
  const { type, content, id } = cell;
  const dispatch = useAppDispatch();
  const handleDeleteCell = () => {
    dispatch(deleteCell({ id }));
  };
  const handleMoveClick = (direction: 'up' | 'down') => {
    dispatch(
      moveCell({
        id,
        direction,
      })
    );
  };
  return (
    <>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleDeleteCell()}>Delete Cell X</button>
          </li>
          <li>
            <button onClick={() => handleMoveClick('up')}>Move Cell Up</button>
          </li>
          <li>
            <button onClick={() => handleMoveClick('down')}>
              Move Cell Down
            </button>
          </li>
        </ul>
      </nav>
      {type === 'code' ? <CodeCell cell={cell} /> : <TextEditor cell={cell} />}
    </>
  );
};

export default FeedCell;
