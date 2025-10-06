import React, { ComponentType, JSX } from 'react';

export type TUser = {
  roles: string[];
  name: string;
  profilePictureUrl: string;
};

export type TAuthConfigProps = {
  requiredRoles: string[];
  fallback: React.ReactNode;
  redirectTo: string;
};

type WrappedComponentProps<P> = ComponentType<P & TUser>;

type TWithAuthProps = (
  config: TAuthConfigProps,
) => <P extends object>(
  WrapperComponent: WrappedComponentProps<P>,
) => ComponentType<P>;

const withAuth: TWithAuthProps =
  (config: TAuthConfigProps) =>
  <P extends object>(WrapperComponent: WrappedComponentProps<P>) => {
    const WrapperAuthComponent = (props: P) => {
      const { fallback, redirectTo, requiredRoles } = config;

      // Mock user data for demonstration purposes
      const user: TUser = {
        roles: ['user', 'admin'], // Example roles
        name: 'John Doe',
        profilePictureUrl: 'https://avatar.iran.liara.run/public',
      };

      const hasPermission = requiredRoles.some((role) =>
        user.roles.includes(role),
      );

      if (!hasPermission) {
        return fallback ? (
          <>{fallback}</>
        ) : (
          <>{`Redirecting to ${redirectTo}`}</>
        );
      }

      const finalProps = { ...props, ...user } as P & TUser;

      return <WrapperComponent {...finalProps} />;
    };

    return WrapperAuthComponent;
  };

export default withAuth;
