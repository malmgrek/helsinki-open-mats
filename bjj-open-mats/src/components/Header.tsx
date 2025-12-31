import React from 'react';

export function Header(): JSX.Element {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center md:justify-start">
          <span className="text-5xl mr-4">🥋</span>
          <div>
            <h1 className="text-4xl font-bold text-center md:text-left">
              BJJ Open Mat Finder
            </h1>
            <p className="text-gray-300 text-sm mt-2 text-center md:text-left">
              Discover open mat sessions at gyms near you
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
