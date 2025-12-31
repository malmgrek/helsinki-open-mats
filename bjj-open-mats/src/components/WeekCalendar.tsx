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

  const calculateOccurrenceInMonth = (date: Date): number => {
    return Math.ceil(date.getDate() / 7);
  };

  const isLastOccurrenceOfDayInMonth = (date: Date): boolean => {
    const nextWeek = new Date(date);
    nextWeek.setDate(date.getDate() + 7);
    return nextWeek.getMonth() !== date.getMonth();
  };

  const parseTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const checkOverlap = (session1: OpenMatSession, session2: OpenMatSession): boolean => {
    const start1 = parseTimeToMinutes(session1.startTime);
    const end1 = parseTimeToMinutes(session1.endTime);
    const start2 = parseTimeToMinutes(session2.startTime);
    const end2 = parseTimeToMinutes(session2.endTime);

    return start1 < end2 && start2 < end1;
  };

  const groupOverlappingSessions = (sessions: OpenMatSession[]): OpenMatSession[][] => {
    if (sessions.length === 0) return [];

    const groups: OpenMatSession[][] = [];
    let currentGroup: OpenMatSession[] = [sessions[0]];

    for (let i = 1; i < sessions.length; i++) {
      const currentSession = sessions[i];
      const lastInGroup = currentGroup[currentGroup.length - 1];

      if (checkOverlap(lastInGroup, currentSession)) {
        currentGroup.push(currentSession);
      } else {
        groups.push(currentGroup);
        currentGroup = [currentSession];
      }
    }

    groups.push(currentGroup);
    return groups;
  };

  const getSessionsForDay = (dayOfWeek: number, date: Date): OpenMatSession[] => {
    const filteredSessions = sessions.filter((session) => {
      if (session.frequency === 'weekly') {
        return session.dayOfWeek === dayOfWeek;
      } else if (session.frequency === 'monthly' && session.monthlyOccurrence) {
        if (session.dayOfWeek !== dayOfWeek) return false;
        
        const occurrenceInMonth = calculateOccurrenceInMonth(date);
        const isLastOccurrence = isLastOccurrenceOfDayInMonth(date);
        
        if (session.monthlyOccurrence === 'last') {
          return isLastOccurrence;
        } else {
          const occurrenceMap: Record<string, number> = { 
            first: 1, 
            second: 2, 
            third: 3, 
            fourth: 4 
          };
          return occurrenceInMonth === occurrenceMap[session.monthlyOccurrence];
        }
      }
      return false;
    });

    return filteredSessions.sort((a, b) => {
      return parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime);
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
          const sessionGroups = groupOverlappingSessions(daySessions);
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
                {sessionGroups.length > 0 ? (
                  sessionGroups.map((group, groupIdx) => (
                    <div key={groupIdx}>
                      {group.length > 1 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {group.map((session) => (
                            <SessionCard key={session.id} session={session} />
                          ))}
                        </div>
                      ) : (
                        <SessionCard key={group[0].id} session={group[0]} />
                      )}
                    </div>
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
