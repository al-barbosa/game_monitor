export default interface Game {
  id: number;
  name: string;
  released: string;
  rating: number;
  platforms: { platform: { name: string } }[];
  metacritic: number;
}
