'use client';

import React, { useState } from 'react';
import withLogger from '../exercise-hoc/withLogger';

type Props = {
  message: string;
  onClick: () => void;
  onHover: () => void;
};

const MyComponent = (props: Props) => {
  const { message, onClick, onHover } = props;
  return (
    <div>
      <p>{message}</p>
      <button onClick={onClick} className="bg-orange-400 py-4 px-10 rounded-md">
        Click me
      </button>
      <div onMouseEnter={onHover}>Hover over me</div>
    </div>
  );
};

const logger = withLogger({ prefix: 'MyComponent' });

const MyComponentWithLogger = logger(MyComponent);

const TestWithLogger = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col bg-green-700 p-6">
      <h2 className="text-2xl mb-4">Test With Logger HOC</h2>
      <button
        className="mb-4 p-2 bg-green-300 text-green-800 font-bold rounded-md hover:bg-green-400 active:bg-green-500"
        onClick={() => setToggle(!toggle)}
      >
        Toggle Logger Component ({toggle ? 'On' : 'Off'})
      </button>
      {toggle && (
        <MyComponentWithLogger
          message="Hello, this is logged!"
          onClick={() => console.log('Button clicked')}
          onHover={() => console.log('Hovered over')}
        />
      )}
    </div>
  );
};

export default TestWithLogger;
