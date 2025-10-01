'use client';

import React from 'react';
import withToggle, { TInjectedToggleProps } from '../exercise-hoc/withToggle';

interface ModalProps {
  title: string;
  children?: React.ReactNode;
}

interface RenderPropsToggleProps {
  children: (props: TInjectedToggleProps) => React.ReactNode;
}

const Modal: React.FC<ModalProps & TInjectedToggleProps> = ({
  title,
  children,
  on,
  close,
}) => {
  if (!on) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">{title}</h2>
          <button
            onClick={close}
            className="bg-red-200 w-8 h-8 rounded-full text-red-600 hover:text-red-700 font-bold"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const RenderPropsToggle: React.FC<
  RenderPropsToggleProps & TInjectedToggleProps
> = ({ children, on, toggle, open, close }) => {
  return <>{children({ on, toggle, open, close })}</>;
};

const ModalWithToggle = withToggle({ initialOn: true })(Modal);
const RenderPropsToggleWithToggle = withToggle({ initialOn: true })(
  RenderPropsToggle,
);

const TestWithToggle = () => {
  return (
    <div>
      <h1 className="text-2xl mb-4">HOC Toggle Test</h1>
      <ModalWithToggle title="Test Modal">
        <p className="text-black text-md">
          This is a modal content. Click outside or the "X" to close.
        </p>
      </ModalWithToggle>
      <RenderPropsToggleWithToggle>
        {({ on, toggle, open, close }) => (
          <div className="mt-4">
            <p className="text-black text-md">
              This is a render props content. Click outside or the "X" to close.
            </p>
            <button
              onClick={toggle}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {on ? 'Close' : 'Open'} Render Props Modal
            </button>
            {on && (
              <div className="mt-4 p-4 border border-blue-300 rounded bg-white">
                <h2 className="text-lg font-bold text-blue-600 mb-2">
                  Render Props Modal
                </h2>
                <p className="text-black text-md">
                  This is a modal content from render props. Click outside or
                  the "X" to close.
                </p>
              </div>
            )}
          </div>
        )}
      </RenderPropsToggleWithToggle>
    </div>
  );
};

export default TestWithToggle;
