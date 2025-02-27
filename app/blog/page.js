import { client } from '@/lib/sanity';
import PostCard from '@/components/PostCard';

export default async function BlogPage() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      excerpt
    }
  `);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Blog
      </h1>
      
      <p className="text-xl text-gray-300 mb-8 max-w-3xl">
        Semi-coherent rambles about TTRPGs and game design can be found here. 
        Sometimes I work on my games here. Sometimes I scream into the void.
      </p>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-300">Stay tuned for my first post...</p>
        </div>
      )}
    </div>
  );
}