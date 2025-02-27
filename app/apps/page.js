import { client } from '@/lib/sanity';
import AppCard from '@/components/AppCard';

export default async function AppsPage() {
  const apps = await client.fetch(`
    *[_type == "appPage"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      icon
    }
  `);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Web Apps
      </h1>
      
      <p className="text-xl text-gray-300 mb-8 max-w-3xl">
        Interactive tools and utilities for your tabletop gaming sessions.
      </p>
      
      {apps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <AppCard key={app._id} app={app} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-300">No apps available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}