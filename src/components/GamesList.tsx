import React, { useContext, useState } from 'react';
import { DateContext } from '../contexts/DateContext';
import Game from '../interfaces/GameI';
import useFetchGames from '../hooks/useFetchGames';

const GamesList: React.FC = () => {
  const { selectDate } = useContext(DateContext);


  const [games, setGames] = useState<Game[]>([]);
  const [dateFilter, setDateFilter] = useState<'day' | 'month'>('month');

  const [isLoading, setIsLoading] = useState(false);

  const getByDay = () => {
    return `${selectDate.toISOString().split('T')[0]},${selectDate.toISOString().split('T')[0]}`;
  }

  const getByMonth = () => {
    const year = selectDate.getFullYear();
    const month = selectDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfNextMonth = new Date(year, month + 1, 1);
    const lastDayOfMonth = new Date(firstDayOfNextMonth.getTime() - (24 * 60 * 60 * 1000));
    const formattedFirstDay = firstDayOfMonth.toISOString().split('T')[0];
    const formattedLastDay = lastDayOfMonth.toISOString().split('T')[0];
    console.log(`${formattedFirstDay},${formattedLastDay}`)
    return `${formattedFirstDay},${formattedLastDay}`
  }

  useFetchGames(
    (dateFilter === 'day'
      ? getByDay()
      : getByMonth()),
    setGames,
    setIsLoading,
  );

  const handleSelectDay = () => {
    setDateFilter('day');
  };

  const handleSelectMonth = () => {
    setDateFilter('month');
  };

  return (
    <div>
      <h1>
        Selected Date: {selectDate.toLocaleDateString()} - {selectDate.toLocaleTimeString()}
      </h1>
      <h2>Top rated games:</h2>
      <div>
        <button onClick={handleSelectDay}>Select day</button>
        <button onClick={handleSelectMonth}>Select month</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {games.map(game => (
            <li key={game.id}>
              <strong>{game.name}</strong> - Released: {game.released} - Rating: {game.rating}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GamesList;