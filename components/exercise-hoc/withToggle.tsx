import { ComponentType, JSX, ReactNode, useState } from 'react';

export type TConfigToggle = {
  initialOn?: boolean;
};

export type TInjectedToggleProps = {
  on: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export type TWithRenderProps<P> = P & {
  children?: (props: TInjectedToggleProps) => ReactNode;
};

type TWrappedComponentProps<P> = P & TInjectedToggleProps;

const withToggle =
  (config: TConfigToggle = { initialOn: false }) =>
  <P extends object>(Component: ComponentType<TWrappedComponentProps<P>>) => {
    const ComponentWithToggle = (props: P) => {
      const { initialOn = false } = config;
      const [on, setOn] = useState<boolean>(initialOn);

      const toggle = () => setOn((prev) => !prev);
      const close = () => setOn(false);
      const open = () => setOn(true);

      const injectedProps: TInjectedToggleProps = {
        on,
        toggle,
        open,
        close,
      };

      return <Component {...(props as P)} {...injectedProps} />;
    };

    ComponentWithToggle.displayName = `withToggle(${
      Component.displayName || Component.name || 'Component'
    })`;

    return ComponentWithToggle;
  };

export default withToggle;
