import React from 'react';
import { useAppDispatch } from '../app/hooks/hooks';
import { insertCell } from '../app/slices/cells';
interface AddCellProps {
  nextCellId: string | null;
}
const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const dispatch = useAppDispatch();
  const handleAddCell = (type: 'code' | 'text') => {
    dispatch(
      insertCell({
        id: nextCellId,
        type,
        content: `${
          type === 'code' ? 'console.log("hello world")' : 'hello world'
        }`,
      })
    );
  };
  return (
    <div className='add-cell'>
      <button onClick={() => handleAddCell('code')}>+ Code</button>
      <button onClick={() => handleAddCell('text')}>+ Text</button>
      <div className='divider' />
    </div>
  );
};

export default AddCell;
