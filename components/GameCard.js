import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import TruncatedText from '@/components/TruncatedText';

const dayNames = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday'
};

export default function GameCard({ game }) {
  const imageUrl = game.coverImage ? urlFor(game.coverImage).width(600).height(400).url() : '/placeholder-game.jpg';
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
     
        <div className="relative w-full aspect-video">
        <Image 
            src={imageUrl} 
            alt={game.title}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
        <div className="text-gray-300 mb-4">
        <TruncatedText text={game.description} maxLength={150} />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{dayNames[game.scheduleDay]} at {game.scheduleTime}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm5 2a2 2 0 11-4 0 2 2 0 014 0zm-4 7a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zm10 10v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span>{game.playerCount} / {game.maxPlayers} players</span>
          </div>
        </div>
        
        <a 
          href={game.gameLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md transition-colors"
        >
          Join Game
        </a>
      </div>
    </div>
  );
}