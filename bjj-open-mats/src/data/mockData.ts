import type { OpenMatSession } from '../types/OpenMatSession';

export const mockOpenMatSessions: OpenMatSession[] = [
  {
    id: '1',
    gymName: 'Gracie Barra Downtown',
    address: '123 Main St, San Francisco, CA',
    dayOfWeek: 6, // Saturday
    startTime: '10:00',
    endTime: '12:00',
    frequency: 'weekly',
    cost: 0,
    contactInfo: 'contact@gbdowntown.com',
    registrationLink: 'https://gbdowntown.com/open-mat',
  },
  {
    id: '2',
    gymName: 'Alliance BJJ',
    address: '456 Oak Ave, San Francisco, CA',
    dayOfWeek: 0, // Sunday
    startTime: '11:00',
    endTime: '13:00',
    frequency: 'weekly',
    cost: 10,
    contactInfo: '(555) 123-4567',
    registrationLink: 'https://alliancebjj.com/register',
  },
  {
    id: '3',
    gymName: 'Atos Jiu-Jitsu',
    address: '789 Pine St, San Francisco, CA',
    dayOfWeek: 5, // Friday
    startTime: '18:00',
    endTime: '20:00',
    frequency: 'weekly',
    cost: 0,
    contactInfo: 'info@atosbjj.com',
  },
  {
    id: '4',
    gymName: 'Ralph Gracie Academy',
    address: '321 Market St, San Francisco, CA',
    dayOfWeek: 3, // Wednesday
    startTime: '19:00',
    endTime: '21:00',
    frequency: 'monthly',
    monthlyDate: 15,
    cost: 15,
    contactInfo: '(555) 987-6543',
    registrationLink: 'https://ralphgracie.com/open-mat',
  },
  {
    id: '5',
    gymName: 'Caio Terra Academy',
    address: '555 Valencia St, San Francisco, CA',
    dayOfWeek: 6, // Saturday
    startTime: '09:00',
    endTime: '11:00',
    frequency: 'weekly',
    cost: 0,
    contactInfo: 'contact@caioterrra.com',
  },
  {
    id: '6',
    gymName: 'Heroes Martial Arts',
    address: '888 Mission St, San Jose, CA',
    dayOfWeek: 0, // Sunday
    startTime: '10:00',
    endTime: '12:00',
    frequency: 'weekly',
    cost: 5,
    contactInfo: 'info@heroesma.com',
    registrationLink: 'https://heroesma.com/open-mat',
  },
];
