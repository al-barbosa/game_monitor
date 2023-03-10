import React, { useContext, useState, useEffect } from 'react';
import { DateContext } from '../contexts/DateContext';

interface Game {
  id: number;
  name: string;
  released: string;
  rating: number;
}

const GamesList: React.FC = () => {
  const { selectDate } = useContext(DateContext);

  const [games, setGames] = useState<Game[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchGames = async () => {
      try {
        let formattedDate = selectDate.toISOString().split('T')[0];
        let ratingFilter = '';
        if (selectedDay !== null) {
          formattedDate = `${formattedDate.slice(0, -2)}${selectedDay}`;
          console.log(formattedDate)
          const response = await fetch(`https://api.rawg.io/api/games?key=730fd79adb5a423fb494edd29280c593&dates=${formattedDate},${formattedDate}`);
          const data = await response.json();
          setGames(data.results);
        } else if (selectedMonth !== null) {
          formattedDate = `${formattedDate.slice(0, -5)}${selectedMonth}-01`;
          const lastDayOfMonth = new Date(selectDate.getFullYear(), selectedMonth, 0).getDate();
          formattedDate += `,${formattedDate.slice(0, -2)}${lastDayOfMonth}`;
          ratingFilter = '&metacritic=1,100';
        }
        // const response = await fetch(`https://api.rawg.io/api/games?key=730fd79adb5a423fb494edd29280c593&dates=${formattedDate}${ratingFilter}`);
        // const data = await response.json();
        // console.log(data.results);
        // setGames(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [selectDate, selectedDay, selectedMonth]);


  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    setSelectedMonth(null);
  };

  const handleSelectMonth = (month: number) => {
    setSelectedDay(null);
    setSelectedMonth(month);
  };

  return (
    <div>
      <h1>
        Selected Date: {selectDate.toLocaleDateString()} - {selectDate.toLocaleTimeString()}
      </h1>
      <h2>Top rated games:</h2>
      <div>
        <button onClick={() => handleSelectDay(selectDate.getDate())}>Select day</button>
        <button onClick={() => handleSelectMonth(selectDate.getMonth() + 1)}>Select month</button>
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