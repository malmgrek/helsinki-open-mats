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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onPreviousWeek}
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors shadow-sm"
        >
          ← Previous
        </button>
        <h2 className="text-2xl font-bold text-gray-900">
          {formatWeekRange(weekDates)}
        </h2>
        <button
          onClick={onNextWeek}
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors shadow-sm"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {weekDates.map((date, index) => {
          const daySessions = getSessionsForDay(index, date);
          const todayClass = isToday(date);

          return (
            <div key={index} className="flex flex-col min-h-[300px]">
              <div
                className={`text-center p-4 rounded-t-xl font-bold shadow-sm ${
                  todayClass
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                <div className="text-xs uppercase tracking-wide opacity-90">{DAYS_OF_WEEK[index]}</div>
                <div className="text-2xl font-bold mt-1">{date.getDate()}</div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-b-xl p-3 space-y-2 border border-t-0 border-gray-200">
                {daySessions.length > 0 ? (
                  daySessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-sm text-center">
                      No open mats
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
