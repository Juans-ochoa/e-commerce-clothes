import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonComponent = (props: PropsButton) => ReactNode;

const Button: ButtonComponent = ({ className, children, ...props }) => {
  return (
    <button
      className={`border-2 border-transparent py-2 px-6 bg-blue-500 rounded-md hover:bg-blue-600 active:scale-90 transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
