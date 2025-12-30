import React from 'react';

interface FilterBarProps {
  selectedLocation: string;
  selectedDay: string;
  selectedGym: string;
  locations: string[];
  gyms: string[];
  onLocationChange: (location: string) => void;
  onDayChange: (day: string) => void;
  onGymChange: (gym: string) => void;
}

const DAYS_OF_WEEK = [
  'All Days',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function FilterBar({
  selectedLocation,
  selectedDay,
  selectedGym,
  locations,
  gyms,
  onLocationChange,
  onDayChange,
  onGymChange,
}: FilterBarProps): JSX.Element {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="location-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Location
          </label>
          <select
            id="location-filter"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="day-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Day of Week
          </label>
          <select
            id="day-filter"
            value={selectedDay}
            onChange={(e) => onDayChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="gym-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Gym
          </label>
          <select
            id="gym-filter"
            value={selectedGym}
            onChange={(e) => onGymChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Gyms</option>
            {gyms.map((gym) => (
              <option key={gym} value={gym}>
                {gym}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
