import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks/hooks';
import { insertCell, selectCells } from '../app/slices/cells';
import AddCell from './AddCell';
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
  console.log(order);
  return (
    <main>
      <AddCell nextCellId={null} />
      {sortedCells.map((cell) => (
        <>
          <FeedCell cell={cell} />
          <AddCell nextCellId={cell.id} />
        </>
      ))}
    </main>
  );
};

export default Feed;
