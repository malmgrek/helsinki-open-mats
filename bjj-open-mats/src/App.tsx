import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FilterBar } from './components/FilterBar';
import { WeekCalendar } from './components/WeekCalendar';
import { mockOpenMatSessions } from './data/mockData';
import {
  extractUniqueLocations,
  extractUniqueGyms,
  filterSessionsByLocation,
  filterSessionsByDay,
  filterSessionsByGym,
} from './utils/filterSessions';

function App(): JSX.Element {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('All Days');
  const [selectedGym, setSelectedGym] = useState<string>('');

  const availableLocations = useMemo(
    () => extractUniqueLocations(mockOpenMatSessions),
    []
  );

  const availableGyms = useMemo(
    () => extractUniqueGyms(mockOpenMatSessions),
    []
  );

  const filteredSessions = useMemo(() => {
    let filtered = mockOpenMatSessions;
    filtered = filterSessionsByLocation(filtered, selectedLocation);
    filtered = filterSessionsByDay(filtered, selectedDay);
    filtered = filterSessionsByGym(filtered, selectedGym);
    return filtered;
  }, [selectedLocation, selectedDay, selectedGym]);

  const navigateToPreviousWeek = (): void => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(previousWeek);
  };

  const navigateToNextWeek = (): void => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <FilterBar
          selectedLocation={selectedLocation}
          selectedDay={selectedDay}
          selectedGym={selectedGym}
          locations={availableLocations}
          gyms={availableGyms}
          onLocationChange={setSelectedLocation}
          onDayChange={setSelectedDay}
          onGymChange={setSelectedGym}
        />
        <WeekCalendar
          currentDate={currentDate}
          sessions={filteredSessions}
          onPreviousWeek={navigateToPreviousWeek}
          onNextWeek={navigateToNextWeek}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
