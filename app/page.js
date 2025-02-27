import { fetchGames, fetchRecentPosts, fetchFeaturedApps } from '@/lib/sanity';
import GameCard from '@/components/GameCard';
import PostCard from '@/components/PostCard';
import AppCard from '@/components/AppCard';
import Link from 'next/link';

export default async function Home() {
  const games = await fetchGames();
  const recentPosts = await fetchRecentPosts(3);
  const featuredApps = await fetchFeaturedApps();
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Uncivilized Games
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Join my tabletop RPG adventures and explore unique gaming experiences
          </p>
          <Link href="/games" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Browse Available Games
          </Link>
        </div>
      </section>
      
      {/* Games section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Available Games</h2>
          <Link href="/games" className="text-blue-400 hover:text-blue-300">
            View all games →
          </Link>
        </div>
        
        {games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(0, 3).map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-300">No games available at the moment. Check back soon!</p>
          </div>
        )}
      </section>
      
      {/* Blog posts section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Recent Blog Posts</h2>
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            View all posts →
          </Link>
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-300">Stay tuned for my first post...</p>
          </div>
        )}
      </section>
      
      {/* Apps section */}
      {featuredApps.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Featured Apps</h2>
            <Link href="/apps" className="text-blue-400 hover:text-blue-300">
              View all apps →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredApps.map((app) => (
              <AppCard key={app._id} app={app} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}