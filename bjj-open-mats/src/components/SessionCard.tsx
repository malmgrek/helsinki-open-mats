import React from 'react';
import type { OpenMatSession } from "../types/OpenMatSession";

interface SessionCardProps {
  session: OpenMatSession;
}

export function SessionCard({ session }: SessionCardProps): JSX.Element {
  const formatCost = (cost: number): string => {
    return cost === 0 ? 'Free' : `$${cost}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-all hover:border-blue-300">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-sm text-gray-900 leading-tight">{session.gymName}</h3>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
            session.cost === 0
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {formatCost(session.cost)}
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-gray-600">
        <div className="flex items-start">
          <span className="mr-1.5">⏰</span>
          <span className="font-medium">{session.startTime} - {session.endTime}</span>
        </div>

        <div className="flex items-start">
          <span className="mr-1.5">📍</span>
          <span className="text-gray-500 leading-snug">{session.address}</span>
        </div>

        {session.frequency === 'monthly' && session.monthlyDate && (
          <div className="flex items-start">
            <span className="mr-1.5">📅</span>
            <span className="text-gray-500">Monthly - {session.monthlyDate}th</span>
          </div>
        )}

        {session.registrationLink && (
          <a
            href={session.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs font-semibold w-full text-center"
          >
            Register →
          </a>
        )}
      </div>
    </div>
  );
}
