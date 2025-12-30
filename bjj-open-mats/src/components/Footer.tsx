import React from 'react';

export function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} BJJ Open Mat Finder. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Find and share open mat sessions in your community
          </p>
        </div>
      </div>
    </footer>
  );
}
