import React from 'react';
import type { OpenMatSession } from '../types/OpenMatSession';
import { SessionCard } from './SessionCard';

interface WeekCalendarProps {
  currentDate: Date;
  sessions: OpenMatSession[];
  onPreviousWeek: () => void;
  onNextWeek: () => void;
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

export function WeekCalendar({
  currentDate,
  sessions,
  onPreviousWeek,
  onNextWeek,
}: WeekCalendarProps): JSX.Element {
  const getWeekDates = (date: Date): Date[] => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);

    return Array.from({ length: 7 }, (_, index) => {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + index);
      return dayDate;
    });
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getSessionsForDay = (dayOfWeek: number, date: Date): OpenMatSession[] => {
    return sessions.filter((session) => {
      if (session.frequency === 'weekly') {
        return session.dayOfWeek === dayOfWeek;
      } else if (session.frequency === 'monthly' && session.monthlyDate) {
        return session.dayOfWeek === dayOfWeek && date.getDate() === session.monthlyDate;
      }
      return false;
    });
  };

  const formatWeekRange = (dates: Date[]): string => {
    const start = dates[0];
    const end = dates[6];
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${end.getFullYear()}`;
  };

  const weekDates = getWeekDates(currentDate);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onPreviousWeek}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors"
        >
          ← Previous
        </button>
        <h2 className="text-xl font-bold text-gray-900">
          {formatWeekRange(weekDates)}
        </h2>
        <button
          onClick={onNextWeek}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {weekDates.map((date, index) => {
          const daySessions = getSessionsForDay(index, date);
          const todayClass = isToday(date);

          return (
            <div key={index} className="flex flex-col">
              <div
                className={`text-center p-3 rounded-t-lg font-semibold ${
                  todayClass
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <div className="text-sm">{DAYS_OF_WEEK[index]}</div>
                <div className="text-lg">{date.getDate()}</div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-b-lg p-2 min-h-[200px] space-y-2">
                {daySessions.length > 0 ? (
                  daySessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm text-center mt-4">
                    No sessions
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
