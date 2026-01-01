import React from 'react';

export function Footer(): JSX.Element {
  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white mt-16 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <span className="text-5xl">🥋</span>
          </div>
          <h3 className="text-2xl font-black mb-3 tracking-tight">BJJ Open Mat Finder</h3>
          <p className="text-gray-400 text-base mb-2 font-medium">
            © {new Date().getFullYear()} BJJ Open Mat Finder. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm font-medium">
            Find and share open mat sessions in your community
          </p>
        </div>
      </div>
    </footer>
  );
}
