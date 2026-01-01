export interface OpenMatSession {
  id: string;
  gymName: string;
  address: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  startTime: string; // HH:MM format
  endTime: string;
  frequency: 'weekly' | 'monthly';
  monthlyOccurrence?: 'first' | 'second' | 'third' | 'fourth' | 'last'; // Which occurrence in month
  cost: number; // 0 for free
  contactInfo: string;
  registrationLink?: string;
}
