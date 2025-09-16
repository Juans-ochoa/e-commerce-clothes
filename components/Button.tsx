import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonComponent = (props: PropsButton) => ReactNode;

const Button: ButtonComponent = ({ className, children, ...props }) => {
  return (
    <button className={` ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
