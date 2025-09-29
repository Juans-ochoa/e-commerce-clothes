import React, { ComponentType } from 'react';

export type TRequiredProps = {
  isAuthenticated: boolean;
  userRole: 'admin' | 'user' | 'guest';
};

type TComponentWithRequirement = <P extends object>(
  Component: ComponentType<P>,
) => ComponentType<P & TRequiredProps>;

const requirement: TComponentWithRequirement = <P extends object>(
  Component: ComponentType<P>,
) => {
  const Wrapper = (props: P & TRequiredProps) => {
    const { isAuthenticated, userRole } = props;

    if (!isAuthenticated) {
      return <div>Please log in to access this content.</div>;
    }

    if (userRole !== 'admin') {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          You do not have the necessary permissions to view this content.
        </div>
      );
    }

    return <Component {...props} />;
  };

  Wrapper.displayName = `requirement(${
    Component.displayName || Component.name || 'Component'
  })`;

  return Wrapper;
};

export default requirement;
