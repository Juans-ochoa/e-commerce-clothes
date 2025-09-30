import {
  ComponentType,
  UIEventHandler,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react';

type TVirtualizationConfig = {
  itemHeight: number;
  containerHeight: number;
  nodePadding: number;
};

type TVirtualizationProps<T> = {
  items: T[];
  itemCount: number;
  scrollToIndex: (index: number) => void;
};

type TVirtualizedListFc = (
  config: TVirtualizationConfig,
) => <T, P extends { items: T[] }>(
  WrappedComponent: ComponentType<Omit<P, 'items'> & TVirtualizationProps<T>>,
) => ComponentType<P>;

const withVirtualization: TVirtualizedListFc =
  (config) =>
  <T, P extends { items: T[] }>(
    WrappedComponent: ComponentType<Omit<P, 'items'> & TVirtualizationProps<T>>,
  ): ComponentType<P> => {
    const Component = (props: P) => {
      const { containerHeight, itemHeight, nodePadding } = config;
      const { items, ...restProps } = props;

      const [scrollTop, setScrollTop] = useState<number>(0);
      const containerRef = useRef<HTMLUListElement>(null);

      const totalContentHeight = itemHeight * items.length;

      let startNode = Math.floor(scrollTop / itemHeight) - nodePadding;
      startNode = Math.max(0, startNode);

      let visibleNodeCount =
        Math.ceil(containerHeight / itemHeight) + 2 * nodePadding;
      visibleNodeCount = Math.min(items.length - startNode, visibleNodeCount);

      const offsetY = startNode * itemHeight;

      const handleScroll: UIEventHandler<HTMLUListElement> = useCallback(
        (e) => {
          setScrollTop(e.currentTarget.scrollTop);
        },
        [],
      );

      const scrollToIndex = useCallback(
        (index: number) => {
          const targetScrollTop = Math.max(
            0,
            Math.min(index * itemHeight, totalContentHeight - containerHeight),
          );
          setScrollTop(targetScrollTop);

          if (containerRef.current) {
            containerRef.current.scrollTop = targetScrollTop;
          }
        },
        [itemHeight, totalContentHeight, containerHeight],
      );

      const visibleChildren = useMemo(
        () => items.slice(startNode, startNode + visibleNodeCount),
        [items, startNode, visibleNodeCount],
      );

      return (
        <ul
          ref={containerRef}
          className="overflow-y-auto overflow-x-hidden"
          style={{
            height: `${containerHeight}px`,
          }}
          onScroll={handleScroll}
        >
          <div style={{ height: `${totalContentHeight}px` }}>
            <div
              style={{
                transform: `translateY(${offsetY}px)`,
              }}
            >
              <WrappedComponent
                {...(restProps as Omit<P, 'items'>)}
                items={visibleChildren}
                scrollToIndex={scrollToIndex}
                itemCount={items.length}
              />
            </div>
          </div>
        </ul>
      );
    };

    return Component;
  };

export default withVirtualization;
