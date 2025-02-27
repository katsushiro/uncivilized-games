import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';

export default function AppCard({ app }) {
  const iconUrl = app.icon ? urlFor(app.icon).width(100).height(100).url() : '/placeholder-icon.svg';
  
  return (
    <Link href={`/apps/${app.slug.current}`}>
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg transition-all hover:shadow-blue-900/20 hover:shadow-xl">
        <div className="flex items-center mb-3">
          <div className="relative w-10 h-10 mr-3">
            <Image 
              src={iconUrl} 
              alt={app.title}
              fill
              className="object-contain rounded-md"
            />
          </div>
          <h3 className="text-lg font-bold text-white">{app.title}</h3>
        </div>
        
        {app.description && (
          <p className="text-gray-300 line-clamp-2 text-sm">{app.description}</p>
        )}
      </div>
    </Link>
  );
}