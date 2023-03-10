import React, { useContext } from 'react';
import { DateContext } from '../contexts/DateContext';

const GamesGraphs: React.FC = () => {
  const { selectDate } = useContext(DateContext);

  return (
    <h1>
      Selected Date: {selectDate.toLocaleDateString()} - {selectDate.toLocaleTimeString()}
    </h1>
  );
};

export default GamesGraphs;