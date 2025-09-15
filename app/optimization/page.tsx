'use client';

import { useDeferredValue, useMemo, useState } from 'react';

const users = Array.from({ length: 5000 }, (_, i) => `User ${i + 1}`);

export default function Optimization() {
  const [query, setQuery] = useState<string>('');
  const deferredQuery = useDeferredValue(query);

  const filteredUsers = useMemo(() => {
    const lowercasedQuery = deferredQuery.toLowerCase();

    if (!lowercasedQuery.trim()) return users;

    return users.filter((user) => user.toLowerCase().includes(lowercasedQuery));
  }, [deferredQuery]);

  return (
    <div className="flex flex-col items-center bg-orange-600 text-orange-100">
      <h1 className="text-4xl font-bold">Optimization Page</h1>
      <div>
        <input
          name="search"
          type="search"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="m-4 rounded-md border-2 border-orange-300 bg-orange-100 p-2 text-black"
        />
      </div>
      <ul className="grid grid-cols-6 gap-4 p-4">
        {filteredUsers.map((user) => (
          <li key={user} className="text-lg font-semibold">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}
