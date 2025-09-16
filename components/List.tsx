import React, { ComponentType } from 'react';

type TListProps<T, PropItem = Record<string, unknown>> = {
  sourceName: string;
  className?: string;
  ComponentItem: ComponentType<PropItem & { [k: string]: T }>;
  items: Array<T>;
};

type TListComponent = <T, PropItem>(
  props: TListProps<T, PropItem>,
) => React.ReactNode;

const List: TListComponent = <T, PropItem>({
  className,
  ComponentItem,
  items,
  sourceName,
}: TListProps<T, PropItem>) => {
  return (
    <ul className={`list-none ${className}`}>
      {items.map((item, key) => {
        const props = { [sourceName]: item } as PropItem & { [k: string]: T };

        return <ComponentItem key={sourceName + `${key}`} {...props} />;
      })}
    </ul>
  );
};

export default List;
