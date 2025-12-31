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
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Filter Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="location-filter"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            📍 Location
          </label>
          <select
            id="location-filter"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            📅 Day of Week
          </label>
          <select
            id="day-filter"
            value={selectedDay}
            onChange={(e) => onDayChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            🥋 Gym
          </label>
          <select
            id="gym-filter"
            value={selectedGym}
            onChange={(e) => onGymChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
