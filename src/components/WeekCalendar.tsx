import type { OpenMatSession } from '../types/OpenMatSession';
import { SessionCard } from './SessionCard';

interface WeekCalendarProps {
  currentDate: Date;
  sessions: OpenMatSession[];
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function WeekCalendar({
  currentDate,
  sessions,
  onPreviousWeek,
  onNextWeek,
}: WeekCalendarProps) {
  const getWeekDates = (date: Date): Date[] => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(startOfWeek.getDate() - daysFromMonday);

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

  const getSessionsForDay = (date: Date): OpenMatSession[] => {
    const jsDayOfWeek = date.getDay();
    
    const filteredSessions = sessions.filter((session) => {
      if (session.frequency === 'weekly') {
        return session.dayOfWeek === jsDayOfWeek;
      } else if (session.frequency === 'monthly' && session.monthlyOccurrence) {
        if (session.dayOfWeek !== jsDayOfWeek) return false;
        
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
    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight text-center mb-6">
          {formatWeekRange(weekDates)}
        </h2>
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onPreviousWeek}
            className="flex-1 md:flex-none px-6 md:px-7 py-3 md:py-4 bg-gray-900 hover:bg-gray-800 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            ← Previous
          </button>
          <button
            onClick={onNextWeek}
            className="flex-1 md:flex-none px-6 md:px-7 py-3 md:py-4 bg-gray-900 hover:bg-gray-800 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
        {weekDates.map((date, index) => {
          const daySessions = getSessionsForDay(date);
          const sessionGroups = groupOverlappingSessions(daySessions);
          const todayClass = isToday(date);
          const hasSessions = sessionGroups.length > 0;

          return (
            <div 
              key={index} 
              className={`flex flex-col min-h-[320px] ${!hasSessions ? 'hidden lg:flex' : ''}`}
            >
              <div
                className={`text-center p-5 rounded-t-2xl font-black shadow-lg transition-all ${
                  todayClass
                    ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white shadow-blue-500/30'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border-2 border-gray-300'
                }`}
              >
                <div className="text-xs uppercase tracking-widest font-bold opacity-90 mb-1">
                  {DAYS_OF_WEEK[index]}
                </div>
                <div className="text-3xl font-black">{date.getDate()}</div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-b-2xl p-4 space-y-3 border-2 border-t-0 border-gray-200 shadow-md">
                {hasSessions ? (
                  sessionGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="space-y-3">
                      {group.map((session) => (
                        <SessionCard key={session.id} session={session} />
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-sm font-semibold text-center">
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
