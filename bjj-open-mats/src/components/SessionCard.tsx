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
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-gray-900">{session.gymName}</h3>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            session.cost === 0
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {formatCost(session.cost)}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3">{session.address}</p>

      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-700">
          <span className="font-medium mr-2">⏰</span>
          <span>
            {session.startTime} - {session.endTime}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <span className="font-medium mr-2">📅</span>
          <span className="capitalize">
            {session.frequency}
            {session.frequency === 'monthly' && session.monthlyDate
              ? ` (${session.monthlyDate}th of month)`
              : ''}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <span className="font-medium mr-2">📧</span>
          <span className="truncate">{session.contactInfo}</span>
        </div>

        {session.registrationLink && (
          <a
            href={session.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Register Now
          </a>
        )}
      </div>
    </div>
  );
}
