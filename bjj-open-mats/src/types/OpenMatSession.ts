
export interface OpenMatSession {
  id: string;
  gymName: string;
  address: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  startTime: string; // HH:MM format
  endTime: string;
  frequency: 'weekly' | 'monthly';
  monthlyDate?: number; // Day of month if monthly
  cost: number; // 0 for free
  contactInfo: string;
  registrationLink?: string;
}
