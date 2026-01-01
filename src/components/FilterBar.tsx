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
}: FilterBarProps) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 border border-gray-200">
      <h2 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Filter Sessions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="location-filter"
            className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide"
          >
            📍 Location
          </label>
          <select
            id="location-filter"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-md text-base font-semibold transition-all hover:border-gray-400"
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
            className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide"
          >
            📅 Day of Week
          </label>
          <select
            id="day-filter"
            value={selectedDay}
            onChange={(e) => onDayChange(e.target.value)}
            className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-md text-base font-semibold transition-all hover:border-gray-400"
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
            className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide"
          >
            🥋 Gym
          </label>
          <select
            id="gym-filter"
            value={selectedGym}
            onChange={(e) => onGymChange(e.target.value)}
            className="w-full px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-md text-base font-semibold transition-all hover:border-gray-400"
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
