'use client';

import ErrorBoundaryApp from '@/components/ErrorBoundaryApp';
import { useState } from 'react';

function TestErrorComponent() {
  const [shouldCrash, setShouldCrash] = useState(false);

  // Esto SÍ será capturado
  if (shouldCrash) {
    throw new (Error as any)('Simulated error for testing ErrorBoundaryApp');
  }

  return (
    <div>
      <button
        onClick={() => setShouldCrash(true)}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Trigger Error (Will be caught)
      </button>
    </div>
  );
}

export default function Error() {
  return (
    <div>
      <ErrorBoundaryApp
        fallback={
          <div className="flex flex-col pag-4 bg-red-100 p-8 w-2xl min-h-fit">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
              Error Occurred
            </h1>
            <p className="text-red-800">
              We're sorry, but something went wrong.
            </p>
            <p className="text-red-800">
              Please try refreshing the page or come back later.
            </p>
            <div>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Reload Page
              </button>
            </div>
          </div>
        }
      >
        <article>
          <h1>Content of page</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quod
            quis perspiciatis et esse iusto magnam soluta facilis
            necessitatibus! Iure mollitia deserunt aut, tempore pariatur sunt
            alias cumque dolorum quam.
          </p>
          <TestErrorComponent />
        </article>
      </ErrorBoundaryApp>
    </div>
  );
}
