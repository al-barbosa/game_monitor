import { useContext, useEffect } from 'react';
import { GamesDataContext } from '../contexts/GameDataContext';
import Game from "../interfaces/GameI";
import getMeanScoreByPlatform from "./MeanScore";

const useFetchGames = (
    formattedDateRange: string,
    setGames: React.Dispatch<React.SetStateAction<Game[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
  const { setGamesByPlatform, setMeanScoreByPlatform } = useContext(GamesDataContext);
  
  useEffect(() => {
    setIsLoading(true)
    const fetchGames = async () => {
      try {
        const pageSize = 20;
        let page = 1;
        let allGames: Game[] = [];
        let totalPages = 1;

        while (page <= totalPages) {
          const response = await fetch(
            `https://api.rawg.io/api/games?key=&dates=${formattedDateRange}&page=${page}&page_size=${pageSize}&metacritic=01,100`
          );

          const data = await response.json();
          allGames = [...allGames, ...data.results];
          totalPages = Math.ceil(data.count / pageSize);
          page++;
        }

        setGames(allGames);

        const gamesByPlatform: Record<string, number> = {};
        allGames.forEach(game => {
          if (game.platforms) {
            game.platforms.forEach(platform => {
              if (gamesByPlatform[platform.platform.name]) {
                gamesByPlatform[platform.platform.name]++;
              } else {
                gamesByPlatform[platform.platform.name] = 1;
              }
            });
          }
        });
        setGamesByPlatform(gamesByPlatform);

        const meanScoreByPlatform = getMeanScoreByPlatform(allGames);
        setMeanScoreByPlatform(meanScoreByPlatform);

      } catch (error) {
        console.error(error);
      }
    };
    setIsLoading(false);
    fetchGames();
  }, [setIsLoading,
    formattedDateRange,
    setGames,
    setGamesByPlatform,
    setMeanScoreByPlatform
  ]);

};
export default useFetchGames;
