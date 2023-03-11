import { createContext, useState } from 'react';

interface GamesDataContextI {
  gamesByPlatform: Record<string, number>;
  meanScoreByPlatform: Record<string, number>;
  setGamesByPlatform: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  setMeanScoreByPlatform: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export const GamesDataContext = createContext<GamesDataContextI>({
  gamesByPlatform: {},
  meanScoreByPlatform: {},
  setGamesByPlatform: () => { },
  setMeanScoreByPlatform: () => { },
});


export const GamesDataProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [gamesByPlatform, setGamesByPlatform] = useState<Record<string, number>>({});
  const [meanScoreByPlatform, setMeanScoreByPlatform] = useState<Record<string, number>>({});


  return (
    <GamesDataContext.Provider
      value={{
        gamesByPlatform,
        meanScoreByPlatform,
        setGamesByPlatform,
        setMeanScoreByPlatform,
      }}
    >
      {children}
    </GamesDataContext.Provider>
  );
};