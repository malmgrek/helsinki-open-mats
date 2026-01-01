import type { OpenMatSession } from '../types/OpenMatSession';

export function extractUniqueLocations(sessions: OpenMatSession[]): string[] {
  const cities = sessions.map((session) => {
    const addressParts = session.address.split(',');
    return addressParts[addressParts.length - 2]?.trim() || '';
  });
  return Array.from(new Set(cities)).filter(Boolean).sort();
}

export function extractUniqueGyms(sessions: OpenMatSession[]): string[] {
  return Array.from(new Set(sessions.map((session) => session.gymName))).sort();
}

export function filterSessionsByLocation(
  sessions: OpenMatSession[],
  location: string
): OpenMatSession[] {
  if (!location) return sessions;
  return sessions.filter((session) => session.address.includes(location));
}

export function filterSessionsByDay(
  sessions: OpenMatSession[],
  day: string
): OpenMatSession[] {
  if (day === 'All Days') return sessions;

  const dayIndex = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ].indexOf(day);

  if (dayIndex === -1) return sessions;

  return sessions.filter((session) => session.dayOfWeek === dayIndex);
}

export function filterSessionsByGym(
  sessions: OpenMatSession[],
  gym: string
): OpenMatSession[] {
  if (!gym) return sessions;
  return sessions.filter((session) => session.gymName === gym);
}
