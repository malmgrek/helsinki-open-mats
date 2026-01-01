import type { OpenMatSession } from "../types/OpenMatSession";

interface SessionCardProps {
  session: OpenMatSession;
}

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function SessionCard({ session }: SessionCardProps) {
  const formatCost = (cost: number): string => {
    return cost === 0 ? 'Free' : `$${cost}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-4 hover:shadow-xl hover:border-blue-400 transition-all hover:scale-[1.02] active:scale-[0.98]">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-black text-sm text-gray-900 leading-tight">{session.gymName}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-black whitespace-nowrap ml-2 shadow-sm ${
            session.cost === 0
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 text-white'
          }`}
        >
          {formatCost(session.cost)}
        </span>
      </div>

      <div className="space-y-2 text-xs text-gray-700">
        <div className="flex items-start">
          <span className="mr-2">⏰</span>
          <span className="font-bold">{session.startTime} - {session.endTime}</span>
        </div>

        <div className="flex items-start">
          <span className="mr-2">📍</span>
          <span className="text-gray-600 leading-snug font-medium">{session.address}</span>
        </div>

        {session.frequency === 'monthly' && session.monthlyOccurrence && (
          <div className="flex items-start">
            <span className="mr-2">📅</span>
            <span className="text-gray-600 font-medium">
              {session.monthlyOccurrence.charAt(0).toUpperCase() + session.monthlyOccurrence.slice(1)} {DAYS_OF_WEEK[session.dayOfWeek]} of month
            </span>
          </div>
        )}

        {session.registrationLink && (
          <a
            href={session.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-xs font-black w-full text-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Register →
          </a>
        )}
      </div>
    </div>
  );
}
