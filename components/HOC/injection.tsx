import React, { ComponentType } from 'react';

type PropsToInject = {
  name: string;
  count: number;
  description: string;
  inStock: boolean;
  price: number;
};

type TInjectionPropsFC = <P extends object>(
  WrapperComponent: ComponentType<P & PropsToInject>,
) => ComponentType<Omit<P, keyof PropsToInject>>;

const injection: TInjectionPropsFC = <P extends object>(
  WrapperComponent: ComponentType<P & PropsToInject>,
) => {
  const Hoc = (props: Omit<P, keyof PropsToInject>) => {
    const injectedProps: PropsToInject = {
      name: 'Injected Name',
      count: 42,
      price: 19.99,
      description: 'This description was injected by the HOC.',
      inStock: true,
    };

    const finalProps = { ...props, ...injectedProps } as P & PropsToInject;

    return <WrapperComponent {...finalProps} />;
  };

  Hoc.displayName = `injection(${
    WrapperComponent.displayName || WrapperComponent.name || 'Component'
  })`;

  return Hoc;
};

export default injection;
