import React, { useState } from 'react'
import { DateProvider } from './contexts/DateContext';
import { GamesDataProvider } from './contexts/GameDataContext';
import Calendar from './components/Calendar';
import GamesList from './components/GamesList';
import GamesGraphs from './components/GamesGraphs';

function App() {
  const [dateFilter, setDateFilter] = useState<'day' | 'month'>('month');
  return (
    <DateProvider>
      <GamesDataProvider>
        <div className="App">
          <Calendar date={new Date()} />
          <GamesList dateFilter={dateFilter} setDateFilter={setDateFilter} />
          <GamesGraphs dateFilter={dateFilter} setDateFilter={setDateFilter} />
        </div>
      </GamesDataProvider>
    </DateProvider>
  );
}

export default App;