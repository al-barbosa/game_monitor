import React from 'react'
import { DateProvider } from './contexts/DateContext';
import Calendar from './components/Calendar';

function App() {
  return (
    <DateProvider>
      <div className="App">
        <Calendar date={new Date()} />
      </div>
    </DateProvider>
  );
}

export default App;
