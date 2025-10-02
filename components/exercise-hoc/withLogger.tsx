'use client';

import React, { useEffect, useRef } from 'react';

type TLoggerConfig = {
  logProps?: boolean;
  logEvents?: string[];
  prefix: string;
  development?: boolean;
};

type TComponent<P = Record<string, unknown>> = React.ComponentType<P>;

type TWithLogger = (
  config: TLoggerConfig,
) => <P extends object>(Component: TComponent<P>) => TComponent<P>;

const withLogger: TWithLogger =
  (config: TLoggerConfig) =>
  <P extends object>(Component: TComponent<P>) => {
    const WrappedComponent = (props: P) => {
      const {
        logProps = false,
        logEvents = [],
        prefix,
        // By default, we assume we are in development mode
        development = true,
      } = config;

      const mountTime = useRef<number | null>(null);
      const previousProps = useRef<P | null>(null);

      if (!development) {
        return <Component {...props} />;
      }

      useEffect(() => {
        mountTime.current = Date.now();
        console.log(
          `Mounting ${prefix} at ${new Date(mountTime.current).toISOString()}`,
        );

        return () => {
          const lifeTime = mountTime.current
            ? Date.now() - mountTime.current
            : 0;
          console.log(`Unmounting ${prefix} - after ${lifeTime} ms`);
        };
      }, [prefix]);

      useEffect(() => {
        if (!logProps) return;

        if (previousProps.current) {
          const changedProps = Object.entries(props).filter(([key, value]) => {
            return (
              props[key as keyof P] !== previousProps.current?.[key as keyof P]
            );
          });

          if (changedProps.length > 0) {
            console.log(
              `Changed props in ${prefix}: ${JSON.stringify(
                Object.fromEntries(changedProps),
              )}`,
            );
          }
        } else {
          console.log(`Initial props in ${prefix}: ${JSON.stringify(props)}`);
        }

        previousProps.current = props;
      }, [props]);

      const enhancedProps = { ...props };

      logEvents.forEach((eventName) => {
        const originalEvent = props[eventName as keyof P];

        if (typeof originalEvent === 'function') {
          enhancedProps[eventName as keyof P] = ((...arg: unknown[]) => {
            console.log(
              `Event ${eventName} triggered in ${prefix} with args:`,
              arg,
            );

            return (originalEvent as Function)(...arg);
          }) as P[keyof P];
        }
      });

      return <Component {...enhancedProps} />;
    };

    WrappedComponent.displayName = `withLogger(${
      Component.displayName || Component.name || 'Component'
    })`;

    return WrappedComponent;
  };

export default withLogger;
