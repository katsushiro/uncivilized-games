import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';

export default function PostCard({ post }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(600).height(400).url() : '/placeholder-post.jpg';
  const dateFormatted = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full transition-transform hover:scale-[1.02]">
        <div className="relative h-40 w-full">
          <Image 
            src={imageUrl} 
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-4">
          <div className="text-gray-400 text-sm mb-2">{dateFormatted}</div>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
          {post.excerpt && (
            <p className="text-gray-300 line-clamp-3">{post.excerpt}</p>
          )}
        </div>
      </div>
    </Link>
  );
}