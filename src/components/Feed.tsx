import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks/hooks';
import { insertCell, selectCells } from '../app/slices/cells';
import AddCell from './AddCell';
import CodeCell from './CodeCell';
import FeedCell from './FeedCell';

const Feed: React.FC = () => {
  const cells = useAppSelector(selectCells);
  const { data, loading, error, order } = cells;
  const dispatch = useAppDispatch();
  const sortedCells = order.map((id) => data[id]);
  const handleClick = () => {
    dispatch(
      insertCell({
        content: '# This is a text cell',
        type: 'text',
      })
    );
    dispatch(
      insertCell({
        content: 'console.log("this is a code cell")',
        type: 'code',
      })
    );
  };
  return (
    <main>
      <AddCell nextCellId={null} />
      {sortedCells.map((cell) => {
        const targetIndex = order.findIndex((id) => id === cell.id) + 1;
        return (
          <>
            <FeedCell cell={cell} />
            <AddCell nextCellId={order[targetIndex]} />
          </>
        );
      })}
    </main>
  );
};

export default Feed;
