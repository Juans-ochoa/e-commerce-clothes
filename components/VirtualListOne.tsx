'use client';

import { cn } from '@/lib/utils';
import { ComponentType, ReactNode, UIEventHandler, useState } from 'react';

type PropsVirtualList = {
  renderItem?: ComponentType;
  itemCount: number;
  viewportHeight: number;
  rowHeight: number;
  nodePadding: number;
};

const VirtualListOne = (props: PropsVirtualList) => {
  const { rowHeight, itemCount, viewportHeight, nodePadding } = props;

  const [scrollTop, setScrollTop] = useState<number>(0);

  const totalContentHeight = rowHeight * itemCount;

  let startNode = Math.floor(scrollTop / rowHeight) - nodePadding;
  startNode = Math.max(0, startNode);

  let visibleNodeCount = Math.ceil(itemCount / rowHeight) + 2 * nodePadding;
  visibleNodeCount = Math.min(itemCount - startNode, visibleNodeCount);

  const offsetY = startNode * rowHeight;

  const visibleChildren = Array.from(
    { length: visibleNodeCount },
    (_, index) => (
      <Item key={index} index={startNode + index} height={rowHeight} />
    ),
  );

  const handleScroll: UIEventHandler<HTMLUListElement> = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <ul
      className={cn(
        'overflow-y-auto w-full border-2 border-orange-500 rounded-md flex flex-col gap-1 mt-3',
      )}
      style={{
        height: `${viewportHeight}px`,
        maxHeight: `${viewportHeight}px`,
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: `${totalContentHeight}px`,
        }}
      >
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleChildren}
        </div>
      </div>
    </ul>
  );
};

type TItemProps = {
  index: number;
  height: number;
};

const Item = ({ index, height }: TItemProps): ReactNode => {
  return (
    <li
      className={`h-[${height}px] text-orange-700 border-1 border-orange-200`}
    >
      Item {index + 1}
    </li>
  );
};

export default VirtualListOne;
