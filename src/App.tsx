import React from 'react'
import { DateProvider } from './contexts/DateContext';
import Calendar from './components/Calendar';
import GamesList from './components/GamesList';
import GamesGraphs from './components/GamesGraphs';

function App() {
  return (
    <DateProvider>
      <div className="App">
        <Calendar date={new Date()} />
        <GamesList />
        <GamesGraphs />
      </div>
    </DateProvider>
  );
}

export default App;
