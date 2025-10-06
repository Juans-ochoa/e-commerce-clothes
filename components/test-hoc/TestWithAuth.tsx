import React from 'react';
import withAuth, { TUser } from '../exercise-hoc/withAuth';

const auth = withAuth({
  requiredRoles: ['guest'],
  fallback: (
    <div className="text-red-900 text-md font-medium">
      You do not have permission to view this content.
    </div>
  ),
  redirectTo: '/login',
});

const UserPanel = ({ name, profilePictureUrl }: TUser) => {
  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-orange-400 font-semibold text-xl">User Panel</h2>
      <p className="text-orange-100">Name: {name}</p>
      <img src={profilePictureUrl} alt={`${name}'s profile`} />
    </div>
  );
};

const ComponentWithAuth = auth(UserPanel);

const TestWithAuth = () => {
  return (
    <div className="bg-orange-600 p-4 mt-10 rounded-md">
      <h2 className="text-orange-200 font-semibold text-3xl">Test With Auth</h2>
      <ComponentWithAuth />
    </div>
  );
};

export default TestWithAuth;
