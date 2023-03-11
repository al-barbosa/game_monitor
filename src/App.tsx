import React from 'react'
import { DateProvider } from './contexts/DateContext';
import { GamesDataProvider } from './contexts/GameDataContext';
import Calendar from './components/Calendar';
import GamesList from './components/GamesList';
import GamesGraphs from './components/GamesGraphs';

function App() {

  return (
    <DateProvider>
      <GamesDataProvider>
        <div className="App">
          <Calendar date={new Date()} />
          <GamesList />
          <GamesGraphs />
        </div>
      </GamesDataProvider>
    </DateProvider>
  );
}

export default App;