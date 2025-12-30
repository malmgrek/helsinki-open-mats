import React from 'react';

export function Header(): JSX.Element {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center md:text-left">
          BJJ Open Mat Finder
        </h1>
        <p className="text-gray-300 text-sm mt-2 text-center md:text-left">
          Discover open mat sessions at gyms near you
        </p>
      </div>
    </header>
  );
}
