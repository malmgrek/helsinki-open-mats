import React from 'react';

export function Header(): JSX.Element {
  return (
    <header className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white shadow-2xl border-b border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-7xl mb-6">🥋</span>
          <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tight">
            BJJ Open Mat Finder
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            Discover open mat sessions at gyms near you
          </p>
        </div>
      </div>
    </header>
  );
}
