import { fetchGames } from '@/lib/sanity';
import GameCard from '@/components/GameCard';

export default async function GamesPage() {
  const games = await fetchGames();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Available Games
      </h1>
      
      {games.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-300">No games available at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
}