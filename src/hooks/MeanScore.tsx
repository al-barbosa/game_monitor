import Game from "../interfaces/GameI";

const getMeanScoreByPlatform = (games: Game[]): Record<string, number> => {
  const scoresByPlatform: Record<string, number[]> = {};
  games.forEach(game => {
    if (game.platforms) {
      game.platforms.forEach(platform => {
        if (!scoresByPlatform[platform.platform.name]) {
          scoresByPlatform[platform.platform.name] = [];
        }
        if (game.metacritic) {
          scoresByPlatform[platform.platform.name].push(game.metacritic);
        }
      });
    }
  });

  const meanScoresByPlatform: Record<string, number> = {};
  Object.entries(scoresByPlatform).forEach(([platform, scores]) => {
    const sum = scores.reduce((total, score) => total + score, 0);
    const mean = +(sum / scores.length).toFixed(2);
    meanScoresByPlatform[platform] = mean;
  });

  return meanScoresByPlatform;
};

export default getMeanScoreByPlatform;
