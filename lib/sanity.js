import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'zvax5b4d',
  dataset: 'production', 
  apiVersion: '2023-05-03',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return source ? builder.image(source) : null;
}

export async function fetchGames() {
  return client.fetch(`
    *[_type == "game"] | order(scheduleDay asc) {
      _id,
      title,
      slug,
      coverImage,
      description,
      scheduleDay,
      scheduleTime,
      playerCount,
      maxPlayers,
      gameLink
    }
  `);
}

export async function fetchRecentPosts(limit = 3) {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      excerpt
    }
  `);
}

export async function fetchFeaturedApps() {
  return client.fetch(`
    *[_type == "appPage" && featured == true] | order(title asc) {
      _id,
      title,
      slug,
      description,
      icon
    }
  `);
}