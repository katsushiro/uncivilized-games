import Image from 'next/image';
import { client, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{ slug }`);
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );

  if (!post) {
    return <div>Post not found</div>;
  }

  const dateFormatted = new Date(post.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
        <div className="text-gray-400 mb-8">{dateFormatted}</div>
        
        {post.mainImage && (
          <div className="relative w-full h-[400px] mb-8">
            <Image 
              src={urlFor(post.mainImage).url()} 
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}
        
        <div className="prose prose-lg prose-invert max-w-none">
          {/* Render based on which content type is available */}
          {post.content ? (
            <ReactMarkdown>{post.content}</ReactMarkdown>
          ) : post.body ? (
            <PortableText 
              value={post.body}
              components={{
                types: {
                  image: ({value}) => (
                    <div className="relative w-full h-[300px] my-8">
                      <Image 
                        src={urlFor(value).url()} 
                        alt={value.alt || 'Blog image'}
                        fill
                        className="object-contain"
                      />
                      {value.caption && (
                        <p className="text-center text-gray-400 mt-2">{value.caption}</p>
                      )}
                    </div>
                  )
                }
              }}
            />
          ) : (
            <p className="text-gray-400">This post has no content yet.</p>
          )}
        </div>
      </article>
    </div>
  );
}