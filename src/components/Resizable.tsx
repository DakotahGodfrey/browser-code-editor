import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'x' | 'y';
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [width, setWidth] = useState(0);
  const [boxWidth, setBoxWidth] = useState(window.innerWidth * 0.5);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    let timer: any;
    const handleResize = () => {
      if (timer) {
        window.clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        if (window.innerWidth * 0.5 < boxWidth) {
          setBoxWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [boxWidth]);
  let resizableProps: ResizableBoxProps;

  if (direction === 'x') {
    resizableProps = {
      className: 'resize-x',
      width: boxWidth,
      height: Infinity,
      resizeHandles: ['e'],
      handleSize: [10, 10],
      minConstraints: [width * 0.2, Infinity],
      maxConstraints: [width * 0.8, Infinity],
      onResizeStop: (event, data) => {
        console.log(data);
        setBoxWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ['s'],
      handleSize: [10, 10],
      minConstraints: [Infinity, 150],
      maxConstraints: [Infinity, height * 0.9],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
