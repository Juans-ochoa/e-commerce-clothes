'use client';

import { useEffect, useState } from 'react';

export default function HydrationError() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <h1>Hydration Error Page</h1>
      <p>
        This page is designed to demonstrate a hydration error in a React
        application.
      </p>
      <p className="text-white text-2xl">
        Fetched at: {isClient && <span>{new Date().toLocaleString()}</span>}
      </p>
    </div>
  );
}
